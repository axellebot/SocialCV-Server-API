"use strict";

var jwt = require('jsonwebtoken');

//helpers
const getUserPublicInfo = require('../helpers').getUserPublicInfo;

const User = require('../models/user.schema');


// Generate JWT
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 604800 // in seconds
    });
}

//= =======================================
// Registration Controller
//= =======================================
exports.register = {};
exports.register.post = function (req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) return next(new MissingEmailError());

    // Return error if full name not provided
    if (!firstName || !lastName) return next(new MissingFullNameError());

    // Return error if no password provided
    if (!password) return next(new MissingPasswordError());

    User.findOne({email}, (err, existingUser) => {
        if (err) return next(new DatabaseFindError());

        // If user is not unique, return error
        if (existingUser) next(new EmailAlreadyExistError());

        // If email is unique and password was provided, create account
        const user = new User({
            email,
            password
        });

        user.save((err, user) => {
            if (err) return next(new DatabaseFindError(err));

            // Subscribe member to Mailchimp list
            // mailchimp.subscribeToNewsletter(user.email);

            // Respond with JWT if user was created

            const userInfo = getUserPublicInfo(user);

            res.status(HTTP_STATUS_CREATED).json({
                error: false,
                token: generateToken(userInfo),
                user: userInfo
            });
        });
    });
};

//= =======================================
// Login Controller
//= =======================================
exports.login = {};
exports.login.post = function (req, res, next) {
    User
        .findOne({email: req.body.email})
        .exec(function (err, user) {
            if (err) return next(new DatabaseFindError());
            if (!user) return next(new UserNotFoundError());
            user.verifyPassword(req.body.password, function (err, isMatch) {
                if (err) return next(new AppError(err));
                if (!isMatch) return next(new WrongPasswordError());

                const userInfo = getUserPublicInfo(user);

                const token = jwt.sign(userInfo, config.secret, {
                    expiresIn: 1440 // expires in 1 hour
                });

                if (!token) return next(new ProvidingTokenError());

                res.status(HTTP_STATUS_OK).json({
                    error: false,
                    token: generateToken(userInfo),
                    user: userInfo
                });
            });
        })
};