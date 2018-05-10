"use strict";

// Config
const config = require('../config');

// Requires Packages
const jwt = require('jsonwebtoken');

// Schema
const User = require('../models/user.model');

// Constants
const fields = require('../constants/fields')

// Errors
const MissingEmailError = require('../errors/MissingEmailError');
const MissingUsernameError = require('../errors/MissingUsernameError');
const MissingPasswordError = require('../errors/MissingPasswordError');
const DatabaseFindError = require('../errors/DatabaseFindError');
const EmailAlreadyExistError = require('../errors/EmailAlreadyExistError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const WrongPasswordError = require('../errors/WrongPasswordError');
const ProvidingTokenError = require('../errors/ProvidingTokenError');

// Responses
const LoginResponse = require('../responses/LoginResponse');

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
      res.json(new LoginResponse(generateToken(userPublicDatas.toJSON()), userPublicDatas));
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
      userId=user._id;
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