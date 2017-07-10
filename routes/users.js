var express = require('express');
var router = express.Router();

var utils = require("../utils");

const user = require('../schemas/user.schema');

/* users page. */
var PATH_USERS = "/";
router
    .get(PATH_USERS, function (req, res, next) {
        //TODO : users - Handle options
        var pagination = utils.getPagination(req);
        user
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, users) {
                if (err) return res.status(404).send(err);
                res.json({data: users});
            });
    })
    .post(PATH_USERS, function (req, res, next) {
        //TODO : users - Create user
        res.status(404).send('Create a user');
    })
    .put(PATH_USERS, function (req, res, next) {
        //TODO : users - Add Bulk update
        res.status(404).send('Bulk update of users');
    })
    .delete(PATH_USERS, function (req, res, next) {
        //TODO : users - Remove all users
        res.status(404).send('Remove all users');
    });

/* user page. */
var PATH_USER = PATH_USERS + ":id";
router
    .get(PATH_USER, function (req, res, next) {
        user
            .findById(req.params.id)
            .exec(function (err, user) {
                if (err) return res.status(404).send(err);
                res.json({data: user});
            });
    })
    .post(PATH_USER, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_USER, function (req, res, next) {
        //TODO : user - Update user
        res.status(404).send('Bulk update of users');
    })
    .delete(PATH_USERS, function (req, res, next) {
        //TODO : user - Remove user
        res.status(404).send('Remove user');
    });

module.exports = router;