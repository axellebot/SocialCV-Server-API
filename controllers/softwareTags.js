"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const SoftwareTag = require('../models/softwareTag.schema');

/* SoftwareTags page. */
exports.softwareTags = {};
exports.softwareTags.get = function (req, res, next) {
    //TODO : SoftwareTags - Handle options
    SoftwareTag
        .find({})
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
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
    const softwareTags = req.body.data;
    var softwareTagsUpdated = [];
    Async.eachOf(softwareTags, function (softwareTag, key, callback) {
        const filterUpdate = getFilterEditData(softwareTag._id, req.decoded);
        SoftwareTag
            .findOneAndUpdate(filterUpdate, softwareTag, {new: true}, function (err, softwareTagUpdated) {
                if (err) return callback(err);
                if (softwareTagUpdated) softwareTagsUpdated.push(softwareTagUpdated);
                callback();
            });
    }, function (err) {
        if (err && softwareTagsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && softwareTagsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: softwareTagsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: softwareTagsUpdated
            });
    });
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

exports.softwareTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_SOFTWARE_TAG], req.decoded);
    SoftwareTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, softwareTag) {
            if (err) return next(new DatabaseUpdateError());
            if (!softwareTag) return next(new NotFoundError(MODEL_NAME_SOFTWARE_TAG));
            res
                .status(HTTP_STATUS_OK)
                .json({
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