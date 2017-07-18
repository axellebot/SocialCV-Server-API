"use strict";

// Roles
const
    ROLE_MEMBER = global.constants.ROLE.ROLE_MEMBER,
    ROLE_ADMIN = global.constants.ROLE.ROLE_ADMIN;

// Param Id
const PARAM_ID_USER = global.constants.PARAM.PARAM_ID_USER;

var getRole = require("../../helpers").getRole;

const requireAuthentication = require('./authentication');

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = [
    requireAuthentication,
    function (req, res, next) {
    console.log(req.decoded._id);
    console.log(req.params[PARAM_ID_USER]);
        if (req.decoded._id == req.params[PARAM_ID_USER]) return next();
        if (getRole(req.decoded.role) >= getRole(ROLE_ADMIN)) return next();
        return res.status(401).json({error: true, message: 'Not enough privileges'});
    }];