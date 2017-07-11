const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

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
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
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