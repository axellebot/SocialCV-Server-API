"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const ProjectTag = require('../../models/projectTag.schema');

/* ProjectTags page. */
exports.get = function (req, res, next) {
    //TODO : ProjectTags - Handle options
    ProjectTag
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, projectTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: projectTags});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID_USER])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : ProjectTags - Create projectTag for user
    return next(new NotImplementedError("Create a new projectTag for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID_USER])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : ProjectTags - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of ProjectTags for user : " + req.params[PARAM_ID_USER]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID_USER])) {
        return next(new MissingPrivilegeError());
    }
    ProjectTag
        .remove({user: req.params[PARAM_ID_USER]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};