const getRole = require('../helpers').getRole;

//= =======================================
// Authorization Middleware
//= =======================================

// Role authorization check
module.exports = function (requiredRole) {
    return function (req, res, next) {
        const user = req.user;

        User.findById(user._id, (err, foundUser) => {
            if (err) {
                res.status(422).json({error: true, message: 'No user was found.'});
                return next(err);
            }

            // If user is found, check role.
            if (getRole(foundUser.role) >= getRole(requiredRole)) {
                return next();
            }

            return res.status(401).json({error: true, message: 'You are not authorized to view this content.'});
        });
    };
};