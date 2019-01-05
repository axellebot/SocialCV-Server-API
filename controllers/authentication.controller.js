"use strict";

const db = require('@db');

// Config
var config = require('@config');

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

//= =======================================
// Registration Controller
//= =======================================
// exports.register = (req, res, next) => {
//   // Check for registration errors
//   var userBody = req.body;

//   // Return error if no email provided
//   if (!userBody.email || userBody.email === "") return next(new MissingEmailError());

//   // Return error if full name not provided
//   if (!userBody.username || userBody.username === "") return next(new MissingUsernameError());

//   // Return error if no password provided
//   if (!userBody.password || userBody.password === "") return next(new MissingPasswordError());

//   User
//     .findOne({
//       $or: [{
//           email: userBody.email
//         },
//         {
//           username: userBody.username
//         }
//       ]
//     })
//     .then((existingUser) => {
//       // If user is not unique, return error
//       if (existingUser) throw new EmailAlreadyExistError();
//       var user = new User(userBody);
//       return user.save();
//     })
//     .then((newUser) => {
//       // Respond with JWT if user was created
//       return User
//         .findById(newUser._id)
//     })
//     .then((user) => {
//       res.json(new LoginResponse(generateToken(user.publicData(), user.publicData())));
//     })
//     .catch((err) => {
//       next(err)
//     });
// };
