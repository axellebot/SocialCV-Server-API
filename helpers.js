"use strict";

const
    ROLE_MEMBER = global.constants.ROLE.ROLE_MEMBER,
    ROLE_ADMIN = global.constants.ROLE.ROLE_ADMIN;

const
    uuidv4 = require('uuid/v4'),
    bcrypt = require('bcrypt');

// Set user info from request
module.exports.setUserInfo = function setUserInfo(user) {
    const getUserInfo = {
        _id: user._id,
        email: user.email,
        role: user.role
    };
    return getUserInfo;
};

module.exports.getRole = function getRoleLevel(checkRole) {
    var role;

    switch (checkRole) {
        case ROLE_ADMIN:
            role = 2;
            break;
        case ROLE_MEMBER:
            role = 1;
            break;
        default:
            role = -1;
    }
    return role;
};

module.exports.saltPassword = function (next) {

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

module.exports.verifyPassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports.uuid = function () {
    return uuidv4
};

module.exports.getOptionRemove = function (entityId, loggedUser) {
    console.log(loggedUser);
    switch (loggedUser.role) {
        case ROLE_MEMBER :
            return {_id: entityId, user: loggedUser._id};
        case ROLE_ADMIN:
            return {_id: entityId};
        default:
            //return wrong id to avoid delting data
            return {_id: -1};
    }
};