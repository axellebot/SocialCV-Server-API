"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const ProjectTag = require('../models/projectTag.schema');

/* ProjectTags page. */
exports.projectTags = {};
exports.projectTags.get = function (req, res, next) {
    //TODO : ProjectTags - Handle options
    ProjectTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, ProjectTags) {
            if (err) return next(new DatabaseFindError());
            res.json({data: ProjectTags});
        });
};

exports.projectTags.post = function (req, res, next) {
    //TODO : ProjectTags - Create projectTag
    return next(new NotImplementedError("Create a new projectTag"));
};

exports.projectTags.put = function (req, res, next) {
    //TODO : ProjectTags - Add Bulk update
    return next(new NotImplementedError("Bulk update of projectTags"));
};

exports.projectTags.delete = function (req, res, next) {
    ProjectTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* ProjectTag page. */
exports.projectTag = {};
exports.projectTag.get = function (req, res, next) {
    ProjectTag
        .findById(req.params[PARAM_ID_PROJECT_TAG])
        .exec(function (err, ProjectTag) {
            if (err) return next(new DatabaseFindError());
            res.json({data: ProjectTag});
        });
};

exports.projectTag.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.projectTag.put = function (req, res, next) {
    //TODO : ProjectTag - Update projectTag
    return next(new NotImplementedError("Update details of projectTag " + req.params[PARAM_ID_PROJECT_TAG]));
};

exports.projectTag.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_PROJECT_TAG], req.decoded);
    ProjectTag
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};