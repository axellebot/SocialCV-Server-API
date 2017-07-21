"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Project = require('../../models/project.schema');

/* Projects page. */
exports.get = function (req, res, next) {
    //TODO : Projects - Handle options
    Project
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, projects) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: projects});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Projects - Create project for user
    return next(new NotImplementedError("Create a new project for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Projects - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of projects for user : " + req.params[PARAM_ID_USER]));
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    Project
        .remove({user:userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};