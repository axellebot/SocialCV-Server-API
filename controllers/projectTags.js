"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const ProjectTag = require('../models/projectTag.schema');

/* ProjectTags page. */
exports.projectTags = {};
exports.projectTags.get = function (req, res, next) {
    ProjectTag
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, projectTags) {
            if (err) return next(new DatabaseFindError());
            ProjectTag
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(projectTags, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.projectTags.post = function (req, res, next) {
    var projectTag = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) projectTag.user = req.loggedUser._id;
    projectTag = new ProjectTag(projectTag);

    projectTag.save(function (err, projectTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(projectTagSaved));
    });
};

exports.projectTags.put = function (req, res, next) {
    const projectTags = req.body.data;
    var projectTagsUpdated = [];
    Async.eachOf(projectTags, function (projectTag, key, callback) {
        const filterUpdate = getFilterEditData(projectTag._id, req.loggedUser);
        ProjectTag
            .findOneAndUpdate(filterUpdate, projectTag, {new: true}, function (err, projectTagUpdated) {
                if (err) return callback(err);
                if (projectTagUpdated) projectTagsUpdated.push(projectTagUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(projectTagsUpdated));
    });
};

exports.projectTags.delete = function (req, res, next) {
    ProjectTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};

/* ProjectTag page. */
exports.projectTag = {};
exports.projectTag.get = function (req, res, next) {
    ProjectTag
        .findById(req.params[PARAM_ID_PROJECT_TAG])
        .exec(function (err, projectTag) {
            if (err) return next(new DatabaseFindError());
            if (!projectTag) return next(new NotFoundError(MODEL_NAME_PROJECT_TAG));
            res.json(new SelectDocumentResponse(projectTag));
        });
};

exports.projectTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROJECT_TAG], req.loggedUser);
    ProjectTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, projectTagUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!projectTagUpdated) return next(new NotFoundError(MODEL_NAME_PROJECT_TAG));
            res.json(new UpdateDocumentResponse(projectTagUpdated));
        });
};

exports.projectTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_PROJECT_TAG], req.loggedUser);
    ProjectTag
        .findOneAndRemove(filterRemove, function (err, projectTagDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!projectTagDeleted) return next(new NotFoundError(MODEL_NAME_PROJECT_TAG));
            res.json(new DeleteDocumentResponse(projectTagDeleted));
        });
};