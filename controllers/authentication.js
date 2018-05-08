"use strict";

// Config
const config = require('../config');

// Requires Packages
const jwt = require('jsonwebtoken');

// Schema
const User = require('../models/user.schema');

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
exports.register = {};
exports.register.post = function(req, res, next) {
  // Check for registration errors
  var userBody = req.body;

  // Return error if no email provided
  if (!userBody.email || userBody.email === "") return next(new MissingEmailError());

  // Return error if full name not provided
  if (!userBody.username || userBody.username === "") return next(new MissingUsernameError());

  // Return error if no password provided
  if (!userBody.password || userBody.password === "") return next(new MissingPasswordError());

 User.findOne({
      $or: [{
          email: userBody.email
        },
        {
          username: userBody.username
        }
      ]
    })
    .exec((err, existingUser) => {
      if (err) return next(new DatabaseFindError());

      // If user is not unique, return error
      if (existingUser) return next(new EmailAlreadyExistError());

      // If email is unique and password was provided, create account
      const user = new User(userBody);

      user.save()
        .then((err, user) => {
          if (err) return next(new DatabaseFindError(err));

          // Subscribe member to Mailchimp list
          // mailchimp.subscribeToNewsletter(user.email);

          // Respond with JWT if user was created
          User.findById(user._id, fields.FIELDS_USER_PUBLIC)
            .exec((err, user) => {
              res.json(new LoginResponse(generateToken(user.toJSON()), user));
            });
        });
    });
};

//= =======================================
// Login Controller
//= =======================================
exports.login = {};
exports.login.post = function(req, res, next) {
  var login = req.body.login;
  var plainPassword = req.body.password;
  User.findOne({
      $or: [{
          email: login
        },
        {
          username: login
        }
      ]
    })
    .exec(function(err, user) {
      if (err) return next(new DatabaseFindError());
      if (!user) return next(new UserNotFoundError());
      user.verifyPassword(plainPassword, function(err, isMatch) {
        if (err) return next(err);
        if (!isMatch) return next(new WrongPasswordError());

        User.findById(user._id, fields.FIELDS_USER_PUBLIC)
          .exec((err, user) => {
            res.json(new LoginResponse(generateToken(user.toJSON()), user));
          });
      });
    })
};