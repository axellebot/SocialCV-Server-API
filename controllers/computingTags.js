"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;
var getRoleRank = require("../helpers").getRoleRank;

const ComputingTag = require('../models/computingTag.schema');

/* ComputingTags page. */
exports.computingTags = {};
exports.computingTags.get = function (req, res, next) {
    ComputingTag
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, computingTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: computingTags});
        });
};

exports.computingTags.post = function (req, res, next) {
    var computingTag = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) computingTag.user = req.loggedUser._id;
    computingTag = new ComputingTag(computingTag);

    computingTag.save(function (err, computingTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: computingTagSaved
            });
    });
};

exports.computingTags.put = function (req, res, next) {
    const computingTags = req.body.data;
    var computingTagsUpdated = [];
    Async.eachOf(computingTags, function (computingTag, key, callback) {
        const filterUpdate = getFilterEditData(computingTag._id, req.loggedUser);
        ComputingTag
            .findOneAndUpdate(filterUpdate, computingTag, {new: true}, function (err, computingTagUpdated) {
                if (err) return callback(err);
                if (computingTagUpdated) computingTagsUpdated.push(computingTagUpdated);
                callback();
            });
    }, function (err) {
        if (err && computingTagsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && computingTagsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: computingTagsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: computingTagsUpdated
            });
    });
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

exports.computingTag.put = function (req, res, next) {
    const filterUpdate = getFilterEditData(req.params[PARAM_ID_COMPUTING_TAG], req.loggedUser);
    ComputingTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, computingTag) {
            if (err) return next(new DatabaseUpdateError());
            if (!computingTag) return next(new NotFoundError(MODEL_NAME_COMPUTING_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: computingTag});
        });
};

exports.computingTag.delete = function (req, res, next) {
    const filterRemove = getFilterEditData(req.params[PARAM_ID_COMPUTING_TAG], req.loggedUser);
    ComputingTag
        .findOneAndRemove(filterRemove, function (err, computingTag) {
            if (err) return next(new DatabaseRemoveError());
            if (!computingTag) return next(new NotFoundError(MODEL_NAME_COMPUTING_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: computingTag});
        });
};