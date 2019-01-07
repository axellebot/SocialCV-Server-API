"use strict";

const db = require('@db');

// Config
var config = require('@config');

// Errors
const AccessRestrictedError = require('@errors/AccessRestrictedError');
const BodyMissingDataError = require('@errors/BodyMissingDataError');
const BodyMissingTokenError = require('@errors/BodyMissingTokenError');
const BodyWrongDataError = require('@errors/BodyWrongDataError');
const ClientMissingPrivilegeError = require('@errors/ClientMissingPrivilegeError');
const CursorWrongPaginationError = require('@errors/CursorWrongPaginationError');
const CursorWrongSortError = require('@errors/CursorWrongSortError');
const DatabaseCountError = require('@errors/DatabaseCountError');
const DatabaseCreateError = require('@errors/DatabaseCreateError');
const DatabaseFindError = require('@errors/DatabaseFindError');
const DatabaseRemoveError = require('@errors/DatabaseRemoveError');
const DatabaseUpdateError = require('@errors/DatabaseUpdateError');
const NotFoundError = require('@errors/NotFoundError');
const NotImplementedError = require('@errors/NotImplementedError');
const ProtocolWrongError = require('@errors/ProtocolWrongError');
const TokenAuthenticationError = require('@errors/TokenAuthenticationError');
const TokenExpiredError = require('@errors/TokenExpiredError');
const UserDisabledError = require('@errors/UserDisabledError');
const UserMissingEmailError = require('@errors/UserMissingEmailError');
const UserMissingPasswordError = require('@errors/UserMissingPasswordError');
const UserMissingPrivilegeError = require('@errors/UserMissingPrivilegeError');
const UserMissingUsernameError = require('@errors/UserMissingUsernameError');
const UserNotFoundError = require('@errors/UserNotFoundError');
const UserWrongPasswordError = require('@errors/UserWrongPasswordError');

// Responses
const LoginResponse = require('@responses/LoginResponse');
//= =======================================
// Login Controller
//= =======================================
// exports.login = async (req, res, next) => {
//   return next(new NotImplementedError());
// };

//= =======================================
// Registration Controller
//= =======================================
// exports.register = (req, res, next) => {
//   try {
//     console.log("Register");
//     // Check for registration errors
//     var userBody = req.body;

//     // Return error if no email provided
//     if (!userBody.email || userBody.email === "") return next(new UserMissingEmailError());

//     // Return error if full name not provided
//     if (!userBody.username || userBody.username === "") return next(new UserMissingUsernameError());

//     // Return error if no password provided
//     if (!userBody.password || userBody.password === "") return next(new UserMissingPasswordError());

//     var existingUser = await db.user.findOne({
//       $or: [{
//           email: userBody.email
//         },
//         {
//           username: userBody.username
//         }
//       ]
//     });

//     // If user is not unique, return error
//     if (existingUser) throw new EmailAlreadyExistError();

//     var savedUser = new db.users.create(userBody);
//     res.json(new LoginResponse(generateToken(user.publicData(), user.publicData())));
//   } catch (err) {
//     next(err);
//   }
// };