"use strict";

const ProjectTag = require('../../models/projectTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* ProjectTags page. */
exports.get = function (req, res, next) {
    //TODO : ProjectTags - Handle options
    ProjectTag
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
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
    ProjectTag
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};