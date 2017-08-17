"use strict";

const
    uuidv4 = require('uuid/v4'),
    bcrypt = require('bcrypt');

// Set user info from request
module.exports.getUserPublicInfo = function (user) {
    var userCopy = user.toJSON();
    delete userCopy.password;
    return userCopy;
};

function getRoleRank(checkRole) {
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
}

module.exports.getRoleRank = getRoleRank;

module.exports.saltPassword = function (next) {

    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(config.saltWorkFactor, function (err, salt) {
        if (err) return next(new Error(err));

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(new Error(err));
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

/**
 *
 * @param entityId
 * @param loggedUser
 * @returns {*}
 */
module.exports.getFilterEditData = function (entityId, loggedUser) {
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

/**
 *
 * @param user String
 * @param ownerId String
 * @returns {boolean}
 */
module.exports.userCanEditUserData = function (user, ownerId) {
    if (getRoleRank(user.role) >= getRoleRank(ROLE_ADMIN)) {
        return true;
    }
    return (ownerId === user._id);
};

/**
 *
 * @param a {Object}
 * @param b {Object}
 * @returns {boolean}
 */
module.exports.compareKeys = function (a, b) {
    const
        aKeys = Object.keys(a).sort(),
        bKeys = Object.keys(b).sort();

    return (JSON.stringify(aKeys).equals(JSON.stringify(bKeys)));
};