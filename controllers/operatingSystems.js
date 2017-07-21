"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const OperatingSystem = require('../models/operatingSystem.schema');

/* OperatingSystems page. */
exports.operatingSystems = {};
exports.operatingSystems.get = function (req, res, next) {
    //TODO : OperatingSystems - Handle options
    OperatingSystem
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, operatingSystems) {
            if (err) return next(new DatabaseFindError());
            res.json({data: operatingSystems});
        });
};

exports.operatingSystems.post = function (req, res, next) {
    //TODO : OperatingSystems - Create operatingSystem
    return next(new NotImplementedError("Create a new operatingSystem"));
};

exports.operatingSystems.put = function (req, res, next) {
    //TODO : OperatingSystems - Add Bulk update
    return next(new NotImplementedError("Bulk update of operatingSystems"));
};

exports.operatingSystems.delete = function (req, res, next) {
    OperatingSystem
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* OperatingSystem page. */
exports.operatingSystem = {};
exports.operatingSystem.get = function (req, res, next) {
    OperatingSystem
        .findById(req.params[PARAM_ID_OPERATING_SYSTEM])
        .exec(function (err, operatingSystem) {
            if (err) return next(new DatabaseFindError());
            res.json({data: operatingSystem});
        });
};

exports.operatingSystem.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.operatingSystem.put = function (req, res, next) {
    //TODO : OperatingSystem - Update operatingSystem
    return next(new NotImplementedError("Update details of operatingSystem " + req.params[PARAM_ID_OPERATING_SYSTEM]));
};

exports.operatingSystem.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_OPERATING_SYSTEM], req.decoded);
    OperatingSystem
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};