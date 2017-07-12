var jwt = require('jsonwebtoken');

const setUserInfo = require('../helpers').setUserInfo;
const getRole = require('../helpers').getRole;

const User = require('../models/user.schema');


// Generate JWT
function generateToken(user) {
    return jwt.sign(user, global.config.secret, {
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
    if (!email) {
        return res.status(422).send({error: true, message: 'You must enter an email address.'});
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({error: true, message: 'You must enter your full name.'});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({error: true, message: 'You must enter a password.'});
    }

    User.findOne({email}, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({error: true, message: 'That email address is already in use.'});
        }

        // If email is unique and password was provided, create account
        const user = new User({
            email,
            password,
            profile: {firstName, lastName}
        });

        console.log("create account");

        user.save((err, user) => {
            if (err) {
                return next(err);
            }

            // Subscribe member to Mailchimp list
            // mailchimp.subscribeToNewsletter(user.email);

            // Respond with JWT if user was created

            const userInfo = setUserInfo(user);

            res.status(201).json({
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
            if (err) return next(err);
            if (!user) return res.status(404).json({error: true, message: 'User not found!'});
            user.verifyPassword(req.body.password, function (err, isMatch) {
                if (err) return next(err);
                if (!isMatch) return res.status(404).json({error: true, message: "Password don't match!"});

                const userInfo = setUserInfo(user);

                var token = jwt.sign(userInfo, global.config.secret, {
                    expiresIn: 1440 // expires in 1 hour
                });

                if (!token) return res.status(500).json({error: true, "message": "No token provided"});

                res.status(200).json({
                    error: false,
                    token: generateToken(userInfo),
                    user: userInfo
                });
            });
        })
};