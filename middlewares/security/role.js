"use strict";

var getRoleRank = require("../../helpers").getRoleRank;

const requireAuthentication = require('./authentication');

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (requiredRole) {
    return [
        requireAuthentication,
        function (req, res, next) {
            if (getRoleRank(req.loggedUser.role) >= getRoleRank(requiredRole)) return next();
            return next(new MissingPrivilegeError());
        }];
};