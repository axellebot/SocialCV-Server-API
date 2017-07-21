"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const ProjectTag = require('../models/projectTag.schema');

/* ProjectTags page. */
exports.projectTags = {};
exports.projectTags.get = function (req, res, next) {
    //TODO : ProjectTags - Handle options
    ProjectTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, projectTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: projectTags});
        });
};

exports.projectTags.post = function (req, res, next) {
    //TODO : ProjectTags - Create projectTag
    next(new NotImplementedError("Create a new projectTag"));
};

exports.projectTags.put = function (req, res, next) {
    //TODO : ProjectTags - Add Bulk update
    next(new NotImplementedError("Bulk update of projectTags"));
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

exports.projectTag.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.projectTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROJECT_TAG], req.decoded);
    ProjectTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true},function (err, projectTag) {
            if (err) return next(new DatabaseUpdateError());
            if (!projectTag) return next(new NotFoundError(MODEL_NAME_PROJECT_TAG));
            return res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: projectTag});
        });
};

exports.projectTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_PROJECT_TAG], req.decoded);
    ProjectTag
        .findOneAndRemove(filterRemove, function (err, projectTag) {
            if (err) return next(new DatabaseRemoveError());
            if (!projectTag) return next(new NotFoundError(MODEL_NAME_PROJECT_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: projectTag});
        });
};