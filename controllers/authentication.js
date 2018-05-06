"use strict";

// Config
const config = require('../config');

// Requires Packages
const jwt = require('jsonwebtoken');

// Helpers
const getUserPublicInfo = require('../helpers').getUserPublicInfo;

// Schema
const User = require('../models/user.schema');

// Errors
const MissingEmailError = require('../errors/MissingEmailError');
const MissingFullNameError = require('../errors/MissingFullNameError');
const MissingPasswordError = require('../errors/MissingPasswordError');
const DatabaseFindError = require('../errors/DatabaseFindError');
const EmailAlreadyExistError = require('../errors/EmailAlreadyExistError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const WrongPasswordError = require('../errors/WrongPasswordError');
const ProvidingTokenError = require('../errors/ProvidingTokenError');

// Responses
const LoginResponse = require('../responses/LoginResponse');


// Generate JWT
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds
  });
}

//= =======================================
// Registration Controller
//= =======================================
exports.register = {};
exports.register.post = function(req, res, next) {
  // Check for registration errors
  var userBody = req.body;

  // Return error if no email provided
  if (!userBody.email) return next(new MissingEmailError());

  // Return error if full name not provided
  if (!userBody.firstName || !userBody.lastName) return next(new MissingFullNameError());

  // Return error if no password provided
  if (!userBody.password) return next(new MissingPasswordError());

  User.findOne({
    email: userBody.email
  }, (err, existingUser) => {
    if (err) return next(new DatabaseFindError());

    // If user is not unique, return error
    if (existingUser) return next(new EmailAlreadyExistError());

    // If email is unique and password was provided, create account
    const user = new User(userBody);

    user.save((err, user) => {
      if (err) return next(new DatabaseFindError(err));

      // Subscribe member to Mailchimp list
      // mailchimp.subscribeToNewsletter(user.email);

      // Respond with JWT if user was created

      const userInfo = getUserPublicInfo(user);

      res.json(new LoginResponse(generateToken(userInfo), userInfo));
    });
  });
};

//= =======================================
// Login Controller
//= =======================================
exports.login = {};
exports.login.post = function(req, res, next) {
  User
    .findOne({
      email: req.body.email
    })
    .exec(function(err, user) {
      if (err) return next(new DatabaseFindError());
      if (!user) return next(new UserNotFoundError());
      user.verifyPassword(req.body.password, function(err, isMatch) {
        if (err) return next(err);
        if (!isMatch) return next(new WrongPasswordError());

        const userInfo = getUserPublicInfo(user);

        const token = jwt.sign(userInfo, config.secret, {
          expiresIn: 1440 // expires in 1 hour
        });

        if (!token) return next(new ProvidingTokenError());

        res.json(new LoginResponse(generateToken(userInfo), userInfo));
      });
    })
};