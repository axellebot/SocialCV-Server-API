"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const SoftwareFramework = require('../models/softwareFramework.schema');

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
            res.status(HTTP_STATUS_OK).json({data: softwareFrameworks});
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
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* SoftwareFramework page. */
exports.softwareFramework = {};
exports.softwareFramework.get = function (req, res, next) {
    SoftwareFramework
        .findById(req.params[PARAM_ID_SOFTWARE_FRAMEWORK])
        .exec(function (err, softwareFramework) {
            if (err) return next(new DatabaseFindError());
            if (!softwareFramework) return next(new NotFoundError(MODEL_NAME_SOFTWARE_FRAMEWORK));
            res.status(HTTP_STATUS_OK).json({data: softwareFramework});
        });
};

exports.softwareFramework.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.softwareFramework.put = function (req, res, next) {
    //TODO : SoftwareFramework - Update softwareFramework
    return next(new NotImplementedError("Update details of softwareFramework " + req.params[PARAM_ID_SOFTWARE_FRAMEWORK]));
};

exports.softwareFramework.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_SOFTWARE_FRAMEWORK], req.decoded);
    SoftwareFramework
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};