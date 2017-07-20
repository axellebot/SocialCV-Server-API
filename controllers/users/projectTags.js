"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const ProjectTag = require('../../models/projectTag.schema');

const PARAM_ID = PARAM.PARAM_ID_USER;

/* ProjectTags page. */
exports.get = function (req, res, next) {
    //TODO : ProjectTags - Handle options
    ProjectTag
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, ProjectTags) {
            if (err) return next(new DatabaseFindError());
            res.json({data: ProjectTags});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : ProjectTags - Create projectTag for user
    return next(new NotImplementedError("Create a new projectTag for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : ProjectTags - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of ProjectTags for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    ProjectTag
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};