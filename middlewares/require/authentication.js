"use strict";

var jwt = require('jsonwebtoken');

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // forbidden without token
    console.log("test");
    if (!token) return next(new AccessRestrictedError());

    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
        //failed verification.
        if (err) return next(new FailedAuthenticationToken());

        req.decoded = decoded;
        return next();
    });
};