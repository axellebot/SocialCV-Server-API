"use strict";

// Require Packages
const jwt = require('jsonwebtoken');
const moment = require('moment');

// Config
const config = require('../../config');

// Errors
const AccessRestrictedError = require('../../errors/AccessRestrictedError');
const FailedAuthenticationTokenError = require('../../errors/FailedAuthenticationTokenError');
const ExpiredAuthenticationTokenError = require('../../errors/ExpiredAuthenticationTokenError');
const UserNotFoundError = require('../../errors/UserNotFoundError');
const UserDisabledError = require('../../errors/UserDisabledError');

// Schemas
const User = require('../../models/user.schema')

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // forbidden without token
  if (!token) return next(new AccessRestrictedError());

  // verifies secret and checks exp
  jwt.verify(token, config.secret, (err, decoded) => {
    //failed verification.
    if (err) return next(new FailedAuthenticationTokenError());

    console.log(decoded);

    if (decoded.exp <= moment().unix()) return next(new ExpiredAuthenticationTokenError())

    User.findById(decoded._id, function(err, user) {
      if (!user) return next(new UserNotFoundError());
      if (user.disabled===true) return next(new UserDisabledError());

      req.loggedUser = user;

      delete req.body.token;
      delete req.query.token;
      delete req.headers['x-access-token'];

      return next();
    });
  });
}