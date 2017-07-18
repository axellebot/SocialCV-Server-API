"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const OperatingSystem = require('../models/operatingSystem.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_OPERATING_SYSTEM;

/* OperatingSystems page. */
exports.operatingSystems = {};
exports.operatingSystems.get = function (req, res, next) {
    //TODO : OperatingSystems - Handle options
    OperatingSystem
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, operatingSystems) {
            if (err) return next(err);
            res.json({data: operatingSystems});
        });
};
exports.operatingSystems.post = function (req, res, next) {
    //TODO : OperatingSystems - Create operatingSystem
    res.status(404).send('Create a new OperatingSystem');
};
exports.operatingSystems.put = function (req, res, next) {
    //TODO : OperatingSystems - Add Bulk update
    res.status(404).send('Bulk update of operatingSystems');
};
exports.operatingSystems.delete = function (req, res, next) {
    OperatingSystem
        .remove()
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* OperatingSystem page. */
exports.operatingSystem = {};
exports.operatingSystem.get = function (req, res, next) {
    OperatingSystem
        .findById(req.params[PARAM_ID])
        .exec(function (err, operatingSystem) {
            if (err) return next(err);
            res.json({data: operatingSystem});
        });
};
exports.operatingSystem.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.operatingSystem.put = function (req, res, next) {
    //TODO : OperatingSystem - Update operatingSystem
    res.status(404).send('Update details of operatingSystems');
};
exports.operatingSystem.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    OperatingSystem
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};