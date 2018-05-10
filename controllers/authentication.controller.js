"use strict";

// Config
const config = require('@config');

// Requires Packages
const jwt = require('jsonwebtoken');

// Schema
const User = require('@models/user.model');

// Constants
const fields = require('@constants/fields')

// Errors
const MissingEmailError = require('@errors/MissingEmailError');
const MissingUsernameError = require('@errors/MissingUsernameError');
const MissingPasswordError = require('@errors/MissingPasswordError');
const DatabaseFindError = require('@errors/DatabaseFindError');
const EmailAlreadyExistError = require('@errors/EmailAlreadyExistError');
const FailedAuthenticationTokenError = require('@errors/FailedAuthenticationTokenError');
const UserNotFoundError = require('@errors/UserNotFoundError');
const WrongPasswordError = require('@errors/WrongPasswordError');
const ProvidingTokenError = require('@errors/ProvidingTokenError');
const UserDisabledError = require('@errors/UserDisabledError');

// Responses
const LoginResponse = require('@responses/LoginResponse');

// Generate JWT
function generateToken(plaintText) {
  return jwt.sign(plaintText, config.secret, {
    expiresIn: 172800 // 2 days
  });
}

//= =======================================
// Registration Controller
//= =======================================
exports.register = (req, res, next) => {
  // Check for registration errors
  var userBody = req.body;

  // Return error if no email provided
  if (!userBody.email || userBody.email === "") return next(new MissingEmailError());

  // Return error if full name not provided
  if (!userBody.username || userBody.username === "") return next(new MissingUsernameError());

  // Return error if no password provided
  if (!userBody.password || userBody.password === "") return next(new MissingPasswordError());

  User
    .findOne({
      $or: [{
          email: userBody.email
        },
        {
          username: userBody.username
        }
      ]
    })
    .exec()
    .then((existingUser) => {
      // If user is not unique, return error
      if (existingUser) throw new EmailAlreadyExistError();
      var user = new User(userBody);
      return user.save();
    })
    .then((newUser) => {
      // Respond with JWT if user was created
      return User
        .findById(newUser._id)
        .select(fields.FIELDS_USER_PUBLIC)
        .exec();
    })
    .then((userPublicDatas) => {
      res.json(new LoginResponse(generateToken(userPublicDatas.toJSON(), userPublicDatas)));
    })
    .catch((err) => {
      next(err)
    });
};

//= =======================================
// Login Controller
//= =======================================
exports.login = (req, res, next) => {
  var login = req.body.login;
  var plainPassword = req.body.password;
  var userId;
  User
    .findOne({
      $or: [{
          email: login
        },
        {
          username: login
        }
      ]
    })
    .exec()
    .then((user) => {
      if (!user) throw new UserNotFoundError();
      userId = user._id;
      return user.verifyPassword(plainPassword)
    })
    .then((isMatch) => {
      if (!isMatch) throw new WrongPasswordError();
      return User
        .findById(userId)
        .select(fields.FIELDS_USER_PUBLIC)
        .exec()
    })
    .then((userPublicDatas) => {
      console.log(userPublicDatas);
      res.json(new LoginResponse(generateToken(userPublicDatas.toJSON()), userPublicDatas));
    })
    .catch((err) => {
      return next(err);
    })
};

//= =======================================
// Refresh Token Controller
//= =======================================
exports.refreshToken = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // verifies secret and checks exp
  jwt.verify(token, config.secret, (err, decoded) => {
    //failed verification.
    if (err) return next(new FailedAuthenticationTokenError());

    User
      .findById(decoded._id)
      .select(fields.FIELDS_USER_PUBLIC)
      .exec()
      .then((userPublicDatas) => {
        if (!userPublicDatas) throw new UserNotFoundError();
        if (userPublicDatas.disabled === true) throw new UserDisabledError();
        return res.json(new LoginResponse(generateToken(userPublicDatas.toJSON()), userPublicDatas));
      })
      .catch((err) => {
        next(err);
      });
  });
}