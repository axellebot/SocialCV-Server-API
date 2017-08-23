"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const FrameworkTag = require('../models/frameworkTag.schema');

/* FrameworkTags page. */
exports.frameworkTags = {};
exports.frameworkTags.get = function (req, res, next) {
    FrameworkTag
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, frameworkTags) {
            if (err) return next(new DatabaseFindError());
            res.json(new SelectDocumentsResponse(frameworkTags));
        });
};

exports.frameworkTags.post = function (req, res, next) {
    var frameworkTag = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) frameworkTag.user = req.loggedUser._id;
    frameworkTag = new FrameworkTag(frameworkTag);

    frameworkTag.save(function (err, frameworkTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(frameworkTagSaved));
    });
};

exports.frameworkTags.put = function (req, res, next) {
    const frameworkTags = req.body.data;
    var frameworkTagsUpdated = [];
    Async.eachOf(frameworkTags, function (frameworkTag, key, callback) {
        const filterUpdate = getFilterEditData(frameworkTag._id, req.loggedUser);
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

exports.frameworkTags.delete = function (req, res, next) {
    FrameworkTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
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
            res.json(new SelectDocumentResponse(frameworkTag));
        });
};

exports.frameworkTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_FRAMEWORK_TAG], req.loggedUser);
    FrameworkTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, frameworkTagUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!frameworkTagUpdated) return next(new NotFoundError(MODEL_NAME_FRAMEWORK_TAG));
            res.json(new UpdateDocumentResponse(frameworkTagUpdated));
        });
};

exports.frameworkTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_FRAMEWORK_TAG], req.loggedUser);
    FrameworkTag
        .findOneAndRemove(filterRemove, function (err, frameworkTagDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!frameworkTagDeleted) return next(new NotFoundError(MODEL_NAME_FRAMEWORK_TAG));
            res.json(new DeleteDocumentResponse(frameworkTagDeleted));
        });
};