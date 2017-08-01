"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Software = require('../models/software.schema');

/* Softwares page. */
exports.softwares = {};
exports.softwares.get = function (req, res, next) {
    //TODO : Softwares - Handle options
    Software
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwares) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: softwares});
        });
};

exports.softwares.post = function (req, res, next) {
    //TODO : Softwares - Create software
    next(new NotImplementedError("Create a new software"));
};

exports.softwares.put = function (req, res, next) {
    const softwares = req.body.data;
    var softwaresUpdated = [];
    Async.eachOf(softwares, function (software, key, callback) {
        const filterUpdate = getFilterEditData(software._id, req.decoded);
        Software
            .findOneAndUpdate(filterUpdate, software, {new: true}, function (err, softwareUpdated) {
                if (err) return callback(err);
                if (softwareUpdated) softwaresUpdated.push(softwareUpdated);
                callback();
            });
    }, function (err) {
        if (err && softwaresUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && softwaresUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: softwaresUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: softwaresUpdated
            });
    });
};

exports.softwares.delete = function (req, res, next) {
    Software
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Software page. */
exports.software = {};
exports.software.get = function (req, res, next) {
    Software
        .findById(req.params[PARAM_ID_SOFTWARE])
        .exec(function (err, software) {
            if (err) return next(new DatabaseFindError());
            if (!software) return next(new NotFoundError(MODEL_NAME_SOFTWARE));
            res.status(HTTP_STATUS_OK).json({data: software});
        });
};

exports.software.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_SOFTWARE], req.decoded);
    Software
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, software) {
            if (err) return next(new DatabaseUpdateError());
            if (!software) return next(new NotFoundError(MODEL_NAME_SOFTWARE));
            res
                .status(HTTP_STATUS_OK)
                .json({
                    message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                    data: software
                });
        });
};

exports.software.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_SOFTWARE], req.decoded);
    Software
        .findOneAndRemove(filterRemove, function (err, software) {
            if (err) return next(new DatabaseRemoveError());
            if (!software) return next(new NotFoundError(MODEL_NAME_SOFTWARE));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: software});
        });
};