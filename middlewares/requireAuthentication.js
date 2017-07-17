"use strict";

var jwt = require('jsonwebtoken');
var getRole = require("../helpers").getRole;

module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // forbidden without token
    if (!token) return res.status(403).json({error: true, message: 'Access Restricted'});

    // verifies secret and checks exp
    jwt.verify(token, global.config.secret, (err, decoded) => {
        //failed verification.
        if (err) return res.json({error: true, message: 'Failed to authenticate token.'});
        req.decoded = decoded;
        return next();
    });
};