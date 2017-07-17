"use strict";

const ROLE_MEMBER = global.constants.ROLE_MEMBER,
    ROLE_ADMIN = global.constants.ROLE_ADMIN;

const uuidv4 = require('uuid/v4'),
    bcrypt = require('bcrypt');

/**
 * @param req
 * @return  A JSON object.
 */
exports.getPagination = function (req) {
    var options = {};
    if (req.query.page && req.query.limit) {
        const page = req.query.page, limit = req.query.limit;

        if (page > 0 && limit > 0) {
            options.skip = (page - 1) * limit;
            options.limit = limit * 1;
        }
    }
    return options;
};

// Set user info from request
exports.setUserInfo = function setUserInfo(user) {
    const getUserInfo = {
        _id: user._id,
        email: user.email,
        role: user.role
    };

    return getUserInfo;
};

exports.getRole = function getRoleLevel(checkRole) {
    var role;

    switch (checkRole) {
        case ROLE_ADMIN:
            role = 2;
            break;
        case ROLE_MEMBER:
            role = 1;
            break;
        default:
            role = 1;
    }
    return role;
};

exports.saltPassword = function (next) {

    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(global.config.saltWorkFactor, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
};

exports.verifyPassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

exports.uuid = function () {
    return uuidv4
};