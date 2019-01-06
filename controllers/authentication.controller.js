"use strict";

const db = require('@db');

// Config
var config = require('@config');

// Errors
const AccessRestrictedError=require('@errors/AccessRestrictedError');
const BodyMissingDataError =require('@errors/BodyMissingDataError');
const BodyMissingTokenError =require('@errors/BodyMissingTokenError');
const BodyWrongDataError =require('@errors/BodyWrongDataError');
const ClientMissingPrivilegeError=require('@errors/ClientMissingPrivilegeError');
const CursorWrongPaginationError=require('@errors/CursorWrongPaginationError');
const CursorWrongSortError=require('@errors/CursorWrongSortError');
const DatabaseCountError = require('@errors/DatabaseCountError');
const DatabaseCreateError = require('@errors/DatabaseCreateError');
const DatabaseFindError = require('@errors/DatabaseFindError');
const DatabaseRemoveError = require('@errors/DatabaseRemoveError');
const DatabaseUpdateError = require('@errors/DatabaseUpdateError');
const NotFoundError = require('@errors/NotFoundError');
const NotImplementedError = require('@errors/NotImplementedError');
const ProtocolWrongError= require('@errors/ProtocolWrongError');
const TokenAuthenticationError = require('@errors/TokenAuthenticationError');
const TokenExpiredError = require('@errors/TokenExpiredError');
const UserDisabledError =require('@errors/UserDisabledError');
const UserMissingEmailError=require('@errors/UserMissingEmailError');
const UserMissingPasswordError=require('@errors/UserMissingPasswordError');
const UserMissingPrivilegeError = require('@errors/UserMissingPrivilegeError');
const UserMissingUsernameError = require('@errors/UserMissingUsernameError');
const UserNotFoundError = require('@errors/UserNotFoundError');
const UserWrongPasswordError = require('@errors/UserWrongPasswordError');

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
