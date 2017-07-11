var express = require('express');
var router = express.Router();

var utils = require("../helpers");

const OperatingSystem = require('../models/operatingSystem.schema');

/* OperatingSystems page. */
var PATH_OPERATING_SYSTEMS = "/";
router
    .get(PATH_OPERATING_SYSTEMS, function (req, res, next) {
        //TODO : OperatingSystems - Handle options
        var pagination = utils.getPagination(req);

        OperatingSystem
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, operatingSystems) {
                if (err) return next(err);                res.json({data:operatingSystems});
            });
    })
    .post(PATH_OPERATING_SYSTEMS, function (req, res, next) {
        //TODO : OperatingSystems - Create operatingSystem
        res.status(404).send('Create a OperatingSystem');
    })
    .put(PATH_OPERATING_SYSTEMS, function (req, res, next) {
        //TODO : OperatingSystems - Add Bulk update
        res.status(404).send('Bulk update of operatingSystems');
    })
    .delete(PATH_OPERATING_SYSTEMS, function (req, res, next) {
        //TODO : OperatingSystems - Remove all operatingSystems
        res.status(404).send('Remove all operatingSystems');
    });

/* OperatingSystem page. */
var PATH_OPERATING_SYSTEM = PATH_OPERATING_SYSTEMS + ":id";
router
    .get(PATH_OPERATING_SYSTEM, function (req, res, next) {
        OperatingSystem
            .findById(req.params.id)
            .exec(function (err, operatingSystem) {
                if (err) return next(err);                res.json({data:operatingSystem});
            });
    })
    .post(PATH_OPERATING_SYSTEM, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_OPERATING_SYSTEM, function (req, res, next) {
        //TODO : OperatingSystem - Update operatingSystem
        res.status(404).send('Bulk update of operatingSystems');
    })
    .delete(PATH_OPERATING_SYSTEMS, function (req, res, next) {
        //TODO : OperatingSystem - Remove operatingSystem
        res.status(404).send('Remove operatingSystem');
    });

module.exports = router;