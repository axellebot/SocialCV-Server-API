"use strict";

var getRole = require("../../helpers").getRole;

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
            if (getRole(req.decoded.role) >= getRole(requiredRole)) return next();
            return next(new MissingPrivilegeError());
        }];
};