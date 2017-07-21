"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const FrameworkTag = require('../models/frameworkTag.schema');

/* FrameworkTags page. */
exports.frameworkTags = {};
exports.frameworkTags.get = function (req, res, next) {
    //TODO : FrameworkTags - Handle options
    FrameworkTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, frameworkTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: frameworkTags});
        });
};

exports.frameworkTags.post = function (req, res, next) {
    //TODO : FrameworkTags - Create frameworkTag
    next(new NotImplementedError("Create a new frameworkTag"));
};

exports.frameworkTags.put = function (req, res, next) {
    //TODO : FrameworkTags - Add Bulk update
    next(new NotImplementedError("Bulk update of frameworkTags"));
};

exports.frameworkTags.delete = function (req, res, next) {
    FrameworkTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* FrameworkTag page. */
exports.frameworkTag = {};
exports.frameworkTag.get = function (req, res, next) {
    FrameworkTag
        .findById(req.params[PARAM_ID_FRAMEWORK_TAG])
        .exec(function (err, frameworkTag) {
            if (err) return next(new DatabaseFindError());
            if (!frameworkTag) return next(new NotFoundError(MODEL_NAME_FRAMEWORK_TAG));
            res.status(HTTP_STATUS_OK).json({data: frameworkTag});
        });
};

exports.frameworkTag.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.frameworkTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_FRAMEWORK_TAG], req.decoded);
    FrameworkTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, frameworkTag) {
            if (err) return next(new DatabaseUpdateError());
            if (!frameworkTag) return next(new NotFoundError(MODEL_NAME_FRAMEWORK_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: frameworkTag});
        });
};

exports.frameworkTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_FRAMEWORK_TAG], req.decoded);
    FrameworkTag
        .findOneAndRemove(filterRemove, function (err, frameworkTag) {
            if (err) return next(new DatabaseRemoveError());
            if (!frameworkTag) return next(new NotFoundError(MODEL_NAME_FRAMEWORK_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: frameworkTag});
        });
};