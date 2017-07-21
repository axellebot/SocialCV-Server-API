"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const ComputingTag = require('../models/computingTag.schema');

/* ComputingTags page. */
exports.computingTags = {};
exports.computingTags.get = function (req, res, next) {
    //TODO : ComputingTags - Handle options
    ComputingTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, computingTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: computingTags});
        });
};
exports.computingTags.post = function (req, res, next) {
    //TODO : ComputingTags - Create computingTag
    next(new NotImplementedError("Create a new computingTag"));
};
exports.computingTags.put = function (req, res, next) {
    //TODO : ComputingTags - Add Bulk update
    next(new NotImplementedError("Bulk update of computingTags"));
};
exports.computingTags.delete = function (req, res, next) {
    ComputingTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* ComputingTag page. */
exports.computingTag = {};
exports.computingTag.get = function (req, res, next) {
    ComputingTag
        .findById(req.params[PARAM_ID_COMPUTING_TAG])
        .exec(function (err, computingTag) {
            if (err) return next(new DatabaseFindError());
            if (!computingTag) return next(new NotFoundError(MODEL_NAME_COMPUTING_TAG));
            res.status(HTTP_STATUS_OK).json({data: computingTag});
        });
};

exports.computingTag.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.computingTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_COMPUTING_TAG], req.decoded);
    console.log(filterUpdate, req.body.data);
    ComputingTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, computingTag) {
            if (err) return next(new DatabaseUpdateError());
            if (!computingTag) return next(new NotFoundError(MODEL_NAME_COMPUTING_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: computingTag});
        });
};

exports.computingTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_COMPUTING_TAG], req.decoded);
    ComputingTag
        .findOneAndRemove(filterRemove, function (err, computingTag) {
            if (err) return next(new DatabaseRemoveError());
            if (!computingTag) return next(new NotFoundError(MODEL_NAME_COMPUTING_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: computingTag});
        });
};