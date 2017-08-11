"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const LinkTag = require('../../models/linkTag.schema');

/* Links page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    LinkTag
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, linkTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: linkTags});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    var linkTag = req.body.data;
    linkTag.user = userId;
    linkTag = new LinkTag(linkTag);

    linkTag.save(function (err, linkTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: linkTagSaved
            });
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const linkTags = req.body.data;
    var linkTagsUpdated = [];
    Async.eachOf(linkTags, function (linkTag, key, callback) {
        const filterUpdate = {
            _id: linkTag._id,
            user: userId
        };
        LinkTag
            .findOneAndUpdate(filterUpdate, linkTag, {new: true}, function (err, linkTagUpdated) {
                if (err) return callback(err);
                if (linkTagUpdated) linkTagsUpdated.push(linkTagUpdated);
                callback();
            });
    }, function (err) {
        if (err && linkTagsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && linkTagsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: linkTagsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: linkTagsUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    LinkTag
        .remove({user: req.params[PARAM_ID_USER]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};