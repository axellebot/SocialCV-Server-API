"use strict";

const ProjectTag = require('../models/projectTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_PROJECT_TAG;

/* ProjectTags page. */
exports.projectTags = {};
exports.projectTags.get = function (req, res, next) {
    //TODO : ProjectTags - Handle options
    ProjectTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, ProjectTags) {
            if (err) return next(err);
            res.json({data: ProjectTags});
        });
};
exports.projectTags.post = function (req, res, next) {
    //TODO : ProjectTags - Create projectTag
    res.status(404).send('Create a new ProjectTag');
};
exports.projectTags.put = function (req, res, next) {
    //TODO : ProjectTags - Add Bulk update
    res.status(404).send('Bulk update of ProjectTags');
};
exports.projectTags.delete = function (req, res, next) {
    //TODO : ProjectTags - Remove all projectTags
    res.status(404).send('Remove all ProjectTags');
};

/* ProjectTag page. */
exports.projectTag = {};
exports.projectTag.get = function (req, res, next) {
    ProjectTag
        .findById(req.params[PARAM_ID])
        .exec(function (err, ProjectTag) {
            if (err) return next(err);
            res.json({data: ProjectTag});
        });
};
exports.projectTag.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.projectTag.put = function (req, res, next) {
    //TODO : ProjectTag - Update projectTag
    res.status(404).send('Update details of projectTag');
};
exports.projectTag.delete = function (req, res, next) {
    //TODO : ProjectTag - Remove projectTag
    res.status(404).send('Remove projectTag');
};