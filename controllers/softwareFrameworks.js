"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const SoftwareFramework = require('../models/softwareFramework.schema');

/* SoftwareFrameworks page. */
exports.softwareFrameworks = {};
exports.softwareFrameworks.get = function (req, res, next) {
    SoftwareFramework
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, softwareFrameworks) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: softwareFrameworks});
        });
};

exports.softwareFrameworks.post = function (req, res, next) {
    //TODO : SoftwareFrameworks - Create softwareFramework
    next(new NotImplementedError("Create a new softwareFramework"));
};

exports.softwareFrameworks.put = function (req, res, next) {
    const softwareFrameworks = req.body.data;
    var softwareFrameworksUpdated = [];
    Async.eachOf(softwareFrameworks, function (softwareFramework, key, callback) {
        const filterUpdate = getFilterEditData(softwareFramework._id, req.decoded);
        SoftwareFramework
            .findOneAndUpdate(filterUpdate, softwareFramework, {new: true}, function (err, softwareFrameworkUpdated) {
                if (err) return callback(err);
                if (softwareFrameworkUpdated) softwareFrameworksUpdated.push(softwareFrameworkUpdated);
                callback();
            });
    }, function (err) {
        if (err && softwareFrameworksUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && softwareFrameworksUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: softwareFrameworksUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: softwareFrameworksUpdated
            });
    });
};

exports.softwareFrameworks.delete = function (req, res, next) {
    SoftwareFramework
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
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

exports.softwareFramework.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_SOFTWARE_FRAMEWORK], req.decoded);
    SoftwareFramework
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, softwareFramework) {
            if (err) return next(new DatabaseUpdateError());
            if (!softwareFramework) return next(new NotFoundError(MODEL_NAME_SOFTWARE_FRAMEWORK));
            res
                .status(HTTP_STATUS_OK)
                .json({
                    message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                    data: softwareFramework
                });
        });
};

exports.softwareFramework.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_SOFTWARE_FRAMEWORK], req.decoded);
    SoftwareFramework
        .findOneAndRemove(filterRemove, function (err, softwareFramework) {
            if (err) return next(new DatabaseRemoveError());
            if (!softwareFramework) return next(new NotFoundError(MODEL_NAME_SOFTWARE_FRAMEWORK));
            res
                .status(HTTP_STATUS_OK)
                .json({
                    message: MESSAGE_SUCCESS_RESOURCE_DELETED,
                    data: softwareFramework
                });
        });
};