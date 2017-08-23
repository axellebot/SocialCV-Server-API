"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData,
    getPageCount = require("../../helpers").getPageCount;

const FrameworkTag = require('../../models/frameworkTag.schema');

/* FrameworkTags page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    FrameworkTag
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, frameworkTags) {
            if (err) return next(new DatabaseFindError());
            if (!frameworkTags || frameworkTags.length <= 0) return next(new NotFoundError(MODEL_NAME_FRAMEWORK_TAG));
            FrameworkTag
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(frameworkTags, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};
exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var frameworkTag = req.body.data;
    frameworkTag.user = userId;
    frameworkTag = new FrameworkTag(frameworkTag);

    frameworkTag.save(function (err, frameworkTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(frameworkTagSaved));
    });
};
exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

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
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(frameworkTagsUpdated));
    });
};
exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    FrameworkTag
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};