"use strict";

// Require Packages
const moment = require('moment');
const oauth = require('@oauth');
const passport = require('@passport');
const db = require('@db');

// Config
var config = require('@config');

// Errors
const AccessRestrictedError = require('@errors/AccessRestrictedError');
const ExpiredAuthenticationTokenError = require('@errors/ExpiredAuthenticationTokenError');
const FailedAuthenticationTokenError = require('@errors/FailedAuthenticationTokenError');
const MissingPrivilegeError = require('@errors/MissingPrivilegeError');
const UserNotFoundError = require('@errors/UserNotFoundError');
const UserDisabledError = require('@errors/UserDisabledError');

/** 
 * You would call this with an access token
 * in the body of the message according to OAuth 2.0 standards
 * https://tools.ietf.org/html/rfc6750#section-2.1
 *
 * Example
 * Authorization: Bearer someAccessTokenHere
 */

/**
 * @param options
 */
module.exports.user = (options) => {
  var options = options || {};
  return [
    passport.authenticate(['bearer'], {
      session: false
    }),
    (req, res, next) => {
      if (req.authInfo.scopes && options.scope) {
        if (req.authInfo.scopes.includes(options.scope)) {
          next();
        } else {
          next(new MissingPrivilegeError());
        }
      } else {
        next(new AccessRestrictedError());
      }
    }
  ];
};

/** 
 * You would call this with an client id and client secret
 * in the body of the message according to OAuth 2.0 standards
 * https://tools.ietf.org/html/rfc6750
 */
module.exports.client = (options) => {
  var options = options || {};
  return [
    passport.authenticate(['oauth2-client-password'], {
      session: false
    }),
    (req, res, next) => {
      // TODO : Check client scope
      next();
    }
  ]
}