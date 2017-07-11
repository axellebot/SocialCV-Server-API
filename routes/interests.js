var express = require('express');
var router = express.Router();

var utils = require("../helpers");

const Interest = require('../models/interest.schema');

/* Interests page. */
var PATH_INTERESTS = "/";
router
    .get(PATH_INTERESTS, function (req, res, next) {
        //TODO : Interests - Handle options
        var pagination = utils.getPagination(req);

        Interest
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, interests) {
                if (err) return next(err);
                res.json({data:interests});
            });
    })
    .post(PATH_INTERESTS, function (req, res, next) {
        //TODO : Interests - Create interest
        res.status(404).send('Create a Interest');
    })
    .put(PATH_INTERESTS, function (req, res, next) {
        //TODO : Interests - Add Bulk update
        res.status(404).send('Bulk update of interests');
    })
    .delete(PATH_INTERESTS, function (req, res, next) {
        //TODO : Interests - Remove all interests
        res.status(404).send('Remove all interests');
    });

/* Interest page. */
var PATH_INTEREST = PATH_INTERESTS + ":id";
router
    .get(PATH_INTEREST, function (req, res, next) {
        Interest
            .findById(req.params.id)
            .exec(function (err, interest) {
                if (err) return next(err);
                res.json({data:interest});
            });
    })
    .post(PATH_INTEREST, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_INTEREST, function (req, res, next) {
        //TODO : Interest - Update interest
        res.status(404).send('Bulk update of interests');
    })
    .delete(PATH_INTERESTS, function (req, res, next) {
        //TODO : Interest - Remove interest
        res.status(404).send('Remove interest');
    });

module.exports = router;