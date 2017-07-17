"use strict";

var getRole = require("../helpers").getRole;

const requireAuthentication = require('./requireAuthentication');

module.exports = [
    requireAuthentication,
    function (req, res, next) {
        if (req.decoded.id == req.params[global.constants.PARAM.PARAM_ID_USER]) return next();
        if (getRole(req.decoded.role) >= getRole(global.constants.ROLE.ROLE_ADMIN)) return next();
        return res.status(401).json({error: true, message: 'Not enough privileges'});
    }];