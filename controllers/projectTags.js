"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

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
            res.status(HTTP_STATUS_OK).json({data: projectTags});
        });
};

exports.projectTags.post = function (req, res, next) {
    var projectTag = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) projectTag.user = req.loggedUser._id;
    projectTag = new ProjectTag(projectTag);

    projectTag.save(function (err, projectTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: projectTagSaved
            });
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
        if (err && projectTagsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && projectTagsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: projectTagsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: projectTagsUpdated
            });
    });
};

exports.projectTags.delete = function (req, res, next) {
    ProjectTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
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
            res.status(HTTP_STATUS_OK).json({data: projectTag});
        });
};

exports.projectTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROJECT_TAG], req.loggedUser);
    ProjectTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, projectTag) {
            if (err) return next(new DatabaseUpdateError());
            if (!projectTag) return next(new NotFoundError(MODEL_NAME_PROJECT_TAG));
            return res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: projectTag});
        });
};

exports.projectTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_PROJECT_TAG], req.loggedUser);
    ProjectTag
        .findOneAndRemove(filterRemove, function (err, projectTag) {
            if (err) return next(new DatabaseRemoveError());
            if (!projectTag) return next(new NotFoundError(MODEL_NAME_PROJECT_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: projectTag});
        });
};