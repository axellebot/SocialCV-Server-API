"use strict";

var getPagination = require("../../helpers").getPagination;

const ProjectTag = require('../../models/projectTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* ProjectTags page. */
exports.get = function (req, res, next) {
    //TODO : ProjectTags - Handle options
    var pagination = getPagination(req);

    ProjectTag
        .find({user: req.params[PARAM_ID]})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, ProjectTags) {
            if (err) return next(err);
            res.json({data: ProjectTags});
        });
};
exports.post = function (req, res, next) {
    //TODO : ProjectTags - Create projectTag for user
    res.status(404).send('Create a new ProjectTag for user : ' + req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : ProjectTags - Add Bulk update for user
    res.status(404).send('Bulk update of ProjectTags for user : ' + req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : ProjectTags - Remove all projectTags for user
    res.status(404).send('Remove all ProjectTags for user : ' + req.params[PARAM_ID]);
};