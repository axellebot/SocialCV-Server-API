"use strict";

// Errors
const MissingPrivilegeError = require('../../errors/MissingPrivilegeError');

// Security
const ensureAuthentication = require('./authentication');

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = (...allowed) => {

  const isAllowed = (role) => {
    return allowed.indexOf(role) > -1;
  };

  return [
    ensureAuthentication,
    (req, res, next) => {
      if (req.user && isAllowed(req.user.role)) return next();
      return next(new MissingPrivilegeError());
    }
  ];
};