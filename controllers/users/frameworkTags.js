"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const FrameworkTag = require('../../models/frameworkTag.schema');

/* FrameworkTags page. */
exports.get = function (req, res, next) {
    //TODO : FrameworkTags - Handle options
    FrameworkTag
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, frameworkTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: frameworkTags});
        });
};
exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : FrameworkTags - Create frameworkTag for user
    next(new NotImplementedError("Create a new frameworkTag for user : " + req.params[PARAM_ID_USER]));
};
exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const frameworkTags = req.body.data;
    var frameworkTagsUpdated = [];
    Async.eachOf(frameworkTags, function (frameworkTag, key, callback) {
        const filterUpdate = {
            _id: frameworkTag._id,
            user: userId
        };
        FrameworkTag
            .findOneAndUpdate(filterUpdate, frameworkTag, {new: true}, function (err, frameworkTagUpdated) {
                if (err) return callback(err);
                if (frameworkTagUpdated) frameworkTagsUpdated.push(frameworkTagUpdated);
                callback();
            });
    }, function (err) {
        if (err && frameworkTagsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && frameworkTagsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: frameworkTagsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: frameworkTagsUpdated
            });
    });
};
exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    FrameworkTag
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};