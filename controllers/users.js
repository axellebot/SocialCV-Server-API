var getPagination = require("../helpers").getPagination;

const User = require('../models/user.schema');

/* users page. */
exports.users = {};
exports.users.get = function (req, res, next) {
    //TODO : users - Handle options
    var pagination = getPagination(req);
    User
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, users) {
            if (err) return next(err);
            res.json({data: users});
        });
};
exports.users.post = function (req, res, next) {
    //TODO : users - Create user
    res.status(404).send('Create a new user');
};
exports.users.put = function (req, res, next) {
    //TODO : users - Add Bulk update
    res.status(404).send('Bulk update of users');
};
exports.users.delete = function (req, res, next) {
    //TODO : users - Remove all users
    res.status(404).send('Remove all users');
};

/* user page. */
exports.user = {};
exports.user.get = function (req, res, next) {
    User
        .findById(req.params.id)
        .exec(function (err, user) {
            if (err) return next(err);
            res.json({data: user});
        });
};
exports.user.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.user.put = function (req, res, next) {
    //TODO : user - Update user
    res.status(404).send('Update details of user');
};
exports.user.delete = function (req, res, next) {
    //TODO : user - Remove user
    res.status(404).send('Remove user');
};