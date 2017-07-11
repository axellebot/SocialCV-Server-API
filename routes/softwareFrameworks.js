var express = require('express');
var router = express.Router();

var utils = require("../helpers");

const SoftwareFramework = require('../models/softwareFramework.schema');

/* SoftwareFrameworks page. */
var PATH_Software_FrameworkS = "/";
router
    .get(PATH_Software_FrameworkS, function (req, res, next) {
        //TODO : SoftwareFrameworks - Handle options
        var pagination = utils.getPagination(req);

        SoftwareFramework
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, softwareFrameworks) {
                if (err) return next(err);                res.json({data:softwareFrameworks});
            });
    })
    .post(PATH_Software_FrameworkS, function (req, res, next) {
        //TODO : SoftwareFrameworks - Create softwareFramework
        res.status(404).send('Create a SoftwareFramework');
    })
    .put(PATH_Software_FrameworkS, function (req, res, next) {
        //TODO : SoftwareFrameworks - Add Bulk update
        res.status(404).send('Bulk update of softwareFrameworks');
    })
    .delete(PATH_Software_FrameworkS, function (req, res, next) {
        //TODO : SoftwareFrameworks - Remove all softwareFrameworks
        res.status(404).send('Remove all softwareFrameworks');
    });

/* SoftwareFramework page. */
var PATH_Software_Framework = PATH_Software_FrameworkS + ":id";
router
    .get(PATH_Software_Framework, function (req, res, next) {
        SoftwareFramework
            .findById(req.params.id)
            .exec(function (err, softwareFramework) {
                if (err) return next(err);                res.json({data:softwareFramework});
            });
    })
    .post(PATH_Software_Framework, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_Software_Framework, function (req, res, next) {
        //TODO : SoftwareFramework - Update softwareFramework
        res.status(404).send('Bulk update of softwareFrameworks');
    })
    .delete(PATH_Software_FrameworkS, function (req, res, next) {
        //TODO : SoftwareFramework - Remove softwareFramework
        res.status(404).send('Remove softwareFramework');
    });

module.exports = router;