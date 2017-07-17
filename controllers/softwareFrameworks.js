"use strict";

var getPagination = require("../helpers").getPagination;

const SoftwareFramework = require('../models/softwareFramework.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_SOFTWARE_FRAMEWORK;

/* SoftwareFrameworks page. */
exports.softwareFrameworks = {};
exports.softwareFrameworks.get = function (req, res, next) {
    //TODO : SoftwareFrameworks - Handle options
    var pagination = getPagination(req);
    SoftwareFramework
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, softwareFrameworks) {
            if (err) return next(err);
            res.json({data: softwareFrameworks});
        });
};
exports.softwareFrameworks.post = function (req, res, next) {
    //TODO : SoftwareFrameworks - Create softwareFramework
    res.status(404).send('Create a new SoftwareFramework');
};
exports.softwareFrameworks.put = function (req, res, next) {
    //TODO : SoftwareFrameworks - Add Bulk update
    res.status(404).send('Bulk update of softwareFrameworks');
};
exports.softwareFrameworks.delete = function (req, res, next) {
    //TODO : SoftwareFrameworks - Remove all softwareFrameworks
    res.status(404).send('Remove all softwareFrameworks');
};

/* SoftwareFramework page. */
exports.softwareFramework = {};
exports.softwareFramework.get = function (req, res, next) {
    SoftwareFramework
        .findById(req.params[PARAM_ID])
        .exec(function (err, softwareFramework) {
            if (err) return next(err);
            res.json({data: softwareFramework});
        });
};
exports.softwareFramework.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.softwareFramework.put = function (req, res, next) {
    //TODO : SoftwareFramework - Update softwareFramework
    res.status(404).send('Update details of softwareFrameworks');
};
exports.softwareFramework.delete = function (req, res, next) {
    //TODO : SoftwareFramework - Remove softwareFramework
    res.status(404).send('Remove softwareFramework');
};