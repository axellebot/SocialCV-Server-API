"use strict";

// Others
const config = require('@config');
const moment = require('moment');
const oauth = require('@oauth');
const db = require('@db');
const passport = require('@passport');

// Errors
const AccessRestrictedError = require('@errors/AccessRestrictedError');
const AccessTokenMissingPrivilegeError = require('@errors/AccessTokenMissingPrivilegeError');
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

/** 
 * You would call this with an access token
 * in the body of the message according to OAuth 2.0 standards
 * https://tools.ietf.org/html/rfc6750#section-2.1
 *
 * Example
 * Authorization: Bearer someAccessTokenHere
 *
 * You would call this with an client id and client secret
 * in the body of the message according to OAuth 2.0 standards
 * https://tools.ietf.org/html/rfc6750
 */

/**
 * @param options
 */
module.exports = (options) => {
  var options = options || {};
  return [
    passport.authenticate(['bearer', 'oauth2-client-password'], {
      session: false
    }),
    async (req, res, next) => {
      try {
        //       console.log("req",req );
        console.log("authInfo", req.authInfo);
        if (options.scopes) {
          if (!req.authInfo.scopes) {
            if (req.user) {
              throw new UserMissingPrivilegeError();
            } else {
              throw new ClientMissingPrivilegeError();
            }
          }
          for (var scope of options.scopes) {
            //             console.log("check",scope);
            if (!req.authInfo.scopes.includes(scope)) {
              if (req.user) {
                throw new UserMissingPrivilegeError();
              } else {
                throw new ClientMissingPrivilegeError();
              }
            }
          }
        }
        next();
      } catch (err) {
        next(err);
      }
    }
  ]
}