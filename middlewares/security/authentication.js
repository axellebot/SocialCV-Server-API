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
const User = require('../../models/user.model')

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // forbidden without token
  if (!token) return next(new AccessRestrictedError());

  // verifies secret and checks exp
  jwt.verify(token, config.secret, (err, decoded) => {
    //failed verification.
    if (err) return next(new FailedAuthenticationTokenError());

    if (decoded.exp <= moment().unix()) return next(new ExpiredAuthenticationTokenError())

    User.findById(decoded._id)
      .then((user) => {
        if (!user) throw new UserNotFoundError();
        if (user.disabled === true) throw new UserDisabledError();

        req.user = user;

        return next();
      })
      .catch((err) => {
        next(err);
      })
  });
}