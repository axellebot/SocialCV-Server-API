"use strict";

// Require Packages
const jwt = require('jsonwebtoken');

// Config
const config = require('../../config');

// Errors
const AccessRestrictedError = require('../../errors/AccessRestrictedError');
const FailedAuthenticationToken = require('../../errors/FailedAuthenticationToken');


/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // forbidden without token
    if (!token) return next(new AccessRestrictedError());

    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
        //failed verification.
        if (err) return next(new FailedAuthenticationToken());

        req.loggedUser = decoded;

        delete req.body.token;
        delete req.query.token;
        delete req.headers['x-access-token'];

        return next();
    });
};