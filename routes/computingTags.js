var express = require('express');
var router = express.Router();

var utils = require("../helpers");

const ComputingTag = require('../models/computingTag.schema');

/* ComputingTags page. */
var PATH_COMPUTING_TAGS = "/";
router
    .get(PATH_COMPUTING_TAGS, function (req, res, next) {
        //TODO : ComputingTags - Handle options
        var pagination = utils.getPagination(req);

        ComputingTag
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, computingTags) {
                if (err) return next(err);
                res.json({data:computingTags});
            });
    })
    .post(PATH_COMPUTING_TAGS, function (req, res, next) {
        //TODO : ComputingTags - Create computingTag
        res.status(404).send('Create a ComputingTag');
    })
    .put(PATH_COMPUTING_TAGS, function (req, res, next) {
        //TODO : ComputingTags - Add Bulk update
        res.status(404).send('Bulk update of computingTags');
    })
    .delete(PATH_COMPUTING_TAGS, function (req, res, next) {
        //TODO : ComputingTags - Remove all computingTags
        res.status(404).send('Remove all computingTags');
    });

/* ComputingTag page. */
var PATH_COMPUTING_TAG = PATH_COMPUTING_TAGS + ":id";
router
    .get(PATH_COMPUTING_TAG, function (req, res, next) {
        ComputingTag
            .findById(req.params.id)
            .exec(function (err, computingTag) {
                if (err) return next(err);
                res.json({data:computingTag});
            });
    })
    .post(PATH_COMPUTING_TAG, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_COMPUTING_TAG, function (req, res, next) {
        //TODO : ComputingTag - Update computingTag
        res.status(404).send('Bulk update of computingTags');
    })
    .delete(PATH_COMPUTING_TAGS, function (req, res, next) {
        //TODO : ComputingTag - Remove computingTag
        res.status(404).send('Remove computingTag');
    });

module.exports = router;