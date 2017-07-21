"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Framework = require('../models/framework.schema');

/* Frameworks page. */
exports.frameworks = {};
exports.frameworks.get = function (req, res, next) {
    //TODO : Frameworks - Handle options
    Framework
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, frameworks) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: frameworks});
        });
};

exports.frameworks.post = function (req, res, next) {
    //TODO : Frameworks - Create framework
    next(new NotImplementedError("Create a new framework"));
};

exports.frameworks.put = function (req, res, next) {
    //TODO : Frameworks - Add Bulk update
    next(new NotImplementedError("Bulk update of frameworks"));
};

exports.frameworks.delete = function (req, res, next) {
    Framework
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Framework page. */
exports.framework = {};
exports.framework.get = function (req, res, next) {
    Framework
        .findById(req.params[PARAM_ID_FRAMEWORK])
        .exec(function (err, framework) {
            if (err) return next(new DatabaseFindError());
            if (!framework) return next(new NotFoundError(MODEL_NAME_FRAMEWORK));
            res.status(HTTP_STATUS_OK).json({data: framework});
        });
};

exports.framework.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.framework.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_FRAMEWORK], req.decoded);
    Framework
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, framework) {
            if (err) return next(new DatabaseUpdateError());
            if (!framework) return next(new NotFoundError(MODEL_NAME_FRAMEWORK));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: framework});
        });
};

exports.framework.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_FRAMEWORK], req.decoded);
    Framework
        .findOneAndRemove(filterRemove, function (err, framework) {
            if (err) return next(new DatabaseRemoveError());
            if (!framework) return next(new NotFoundError(MODEL_NAME_FRAMEWORK));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: framework});
        });
};