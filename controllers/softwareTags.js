"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const SoftwareTag = require('../models/softwareTag.schema');

/* SoftwareTags page. */
exports.softwareTags = {};
exports.softwareTags.get = function (req, res, next) {
    //TODO : SoftwareTags - Handle options
    SoftwareTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwareTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: softwareTags});
        });
};

exports.softwareTags.post = function (req, res, next) {
    //TODO : SoftwareTags - Create softwareTag
    next(new NotImplementedError("Create a new softwareTag"));
};

exports.softwareTags.put = function (req, res, next) {
    //TODO : SoftwareTags - Add Bulk update
    next(new NotImplementedError("Bulk update of SoftwareTags"));
};

exports.softwareTags.delete = function (req, res, next) {
    SoftwareTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* SoftwareTag page. */
exports.softwareTag = {};
exports.softwareTag.get = function (req, res, next) {
    SoftwareTag
        .findById(req.params[PARAM_ID_SOFTWARE_TAG])
        .exec(function (err, softwareTag) {
            if (err) return next(new DatabaseFindError());
            if (!softwareTag) return next(new NotFoundError(MODEL_NAME_FRAMEWORK_TAG));
            res.status(HTTP_STATUS_OK).json({data: softwareTag});
        });
};

exports.softwareTag.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.softwareTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_SOFTWARE_TAG], req.decoded);
    SoftwareTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true},function (err, softwareTag) {
            if (err) return next(new DatabaseUpdateError());
            if (!softwareTag) return next(new NotFoundError(MODEL_NAME_SOFTWARE_TAG));
            return res.status(HTTP_STATUS_OK).json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: softwareTag
            });
        });
};

exports.softwareTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_SOFTWARE_TAG], req.decoded);
    SoftwareTag
        .findOneAndRemove(filterRemove, function (err, softwareTag) {
            if (err) return next(new DatabaseRemoveError());
            if (!softwareTag) return next(new NotFoundError(MODEL_NAME_SOFTWARE_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: softwareTag});
        });
};