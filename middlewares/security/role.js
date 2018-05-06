"use strict";

// Helpers
var getRoleRank = require("../../helpers").getRoleRank;

// Errors
const MissingPrivilegeError = require('../../errors/MissingPrivilegeError');

// Security
const ensureAuthentication = require('./ensureAuthentication');

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (requiredRole) {
    return [
        ensureAuthentication,
        function (req, res, next) {
            if (getRoleRank(req.loggedUser.role) >= getRoleRank(requiredRole)) return next();
            return next(new MissingPrivilegeError());
        }];
};