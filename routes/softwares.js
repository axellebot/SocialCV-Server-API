var express = require('express');
var router = express.Router();

var utils = require("../helpers");

const Software = require('../models/software.schema');

/* Softwares page. */
var PATH_SOFTWARES = "/";
router
    .get(PATH_SOFTWARES, function (req, res, next) {
        //TODO : Softwares - Handle options
        var pagination = utils.getPagination(req);

        Software
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, softwares) {
                if (err) return next(err);                res.json({data:softwares});
            });
    })
    .post(PATH_SOFTWARES, function (req, res, next) {
        //TODO : Softwares - Create software
        res.status(404).send('Create a Software');
    })
    .put(PATH_SOFTWARES, function (req, res, next) {
        //TODO : Softwares - Add Bulk update
        res.status(404).send('Bulk update of softwares');
    })
    .delete(PATH_SOFTWARES, function (req, res, next) {
        //TODO : Softwares - Remove all softwares
        res.status(404).send('Remove all softwares');
    });

/* Software page. */
var PATH_SOFTWARE = PATH_SOFTWARES + ":id";
router
    .get(PATH_SOFTWARE, function (req, res, next) {
        Software
            .findById(req.params.id)
            .exec(function (err, software) {
                if (err) return next(err);                res.json({data:software});
            });
    })
    .post(PATH_SOFTWARE, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_SOFTWARE, function (req, res, next) {
        //TODO : Software - Update software
        res.status(404).send('Bulk update of softwares');
    })
    .delete(PATH_SOFTWARES, function (req, res, next) {
        //TODO : Software - Remove software
        res.status(404).send('Remove software');
    });

module.exports = router;