"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const SoftwareTag = require('../../models/softwareTag.schema');

/* SoftwareTags page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    SoftwareTag
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, softwareTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: softwareTags});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    var softwareTag = req.body.data;
    softwareTag.user = userId;
    softwareTag = new SoftwareTag(softwareTag);

    softwareTag.save(function (err, softwareTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: softwareTagSaved
            });
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const softwareTags = req.body.data;
    var softwareTagsUpdated = [];
    Async.eachOf(softwareTags, function (softwareTag, key, callback) {
        const filterUpdate = {
            _id: softwareTag._id,
            user: userId
        };
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
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: softwareTagsUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    SoftwareTag
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};