"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const OperatingSystem = require('../models/operatingSystem.schema');

/* OperatingSystems page. */
exports.operatingSystems = {};
exports.operatingSystems.get = function (req, res, next) {
    OperatingSystem
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, operatingSystems) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: operatingSystems});
        });
};

exports.operatingSystems.post = function (req, res, next) {
    //TODO : OperatingSystems - Create operatingSystem
    next(new NotImplementedError("Create a new operatingSystem"));
};

exports.operatingSystems.put = function (req, res, next) {
    const operatingSystems = req.body.data;
    var operatingSystemsUpdated = [];
    Async.eachOf(operatingSystems, function (operatingSystem, key, callback) {
        const filterUpdate = getFilterEditData(operatingSystem._id, req.decoded);
        OperatingSystem
            .findOneAndUpdate(filterUpdate, operatingSystem, {new: true}, function (err, operatingSystemUpdated) {
                if (err) return callback(err);
                if (operatingSystemUpdated) operatingSystemsUpdated.push(operatingSystemUpdated);
                callback();
            });
    }, function (err) {
        if (err && operatingSystemsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && operatingSystemsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: operatingSystemsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: operatingSystemsUpdated
            });
    });
};

exports.operatingSystems.delete = function (req, res, next) {
    OperatingSystem
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* OperatingSystem page. */
exports.operatingSystem = {};
exports.operatingSystem.get = function (req, res, next) {
    OperatingSystem
        .findById(req.params[PARAM_ID_OPERATING_SYSTEM])
        .exec(function (err, operatingSystem) {
            if (err) return next(new DatabaseFindError());
            if (!operatingSystem) return next(new NotFoundError(MODEL_NAME_OPERATING_SYSTEM));
            res.status(HTTP_STATUS_OK).json({data: operatingSystem});
        });
};

exports.operatingSystem.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_OPERATING_SYSTEM], req.decoded);
    OperatingSystem
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, operatingSystem) {
            if (err) return next(new DatabaseUpdateError());
            if (!operatingSystem) return next(new NotFoundError(MODEL_NAME_OPERATING_SYSTEM));
            return res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: operatingSystem});
        });
};

exports.operatingSystem.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_OPERATING_SYSTEM], req.decoded);
    OperatingSystem
        .findOneAndRemove(filterRemove, function (err, operatingSystem) {
            if (err) return next(new DatabaseRemoveError());
            if (!operatingSystem) return next(new NotFoundError(MODEL_NAME_OPERATING_SYSTEM));
            return res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: operatingSystem});
        });
};