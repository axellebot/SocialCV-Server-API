"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const SoftwareFramework = require('../models/softwareFramework.schema');

const PARAM_ID = PARAM.PARAM_ID_SOFTWARE_FRAMEWORK;

/* SoftwareFrameworks page. */
exports.softwareFrameworks = {};
exports.softwareFrameworks.get = function (req, res, next) {
    //TODO : SoftwareFrameworks - Handle options
    SoftwareFramework
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwareFrameworks) {
            if (err) return next(new DatabaseFindError());
            res.json({data: softwareFrameworks});
        });
};

exports.softwareFrameworks.post = function (req, res, next) {
    //TODO : SoftwareFrameworks - Create softwareFramework
    return next(new NotImplementedError("Create a new softwareFramework"));
};

exports.softwareFrameworks.put = function (req, res, next) {
    //TODO : SoftwareFrameworks - Add Bulk update
    return next(new NotImplementedError("Bulk update of softwareFrameworks"));
};

exports.softwareFrameworks.delete = function (req, res, next) {
    SoftwareFramework
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* SoftwareFramework page. */
exports.softwareFramework = {};
exports.softwareFramework.get = function (req, res, next) {
    SoftwareFramework
        .findById(req.params[PARAM_ID])
        .exec(function (err, softwareFramework) {
            if (err) return next(new DatabaseFindError());
            res.json({data: softwareFramework});
        });
};

exports.softwareFramework.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.softwareFramework.put = function (req, res, next) {
    //TODO : SoftwareFramework - Update softwareFramework
    return next(new NotImplementedError("Update details of softwareFramework " + req.params[PARAM_ID]));
};

exports.softwareFramework.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    SoftwareFramework
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};