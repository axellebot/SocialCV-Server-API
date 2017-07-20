"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Project = require('../../models/project.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Projects page. */
exports.get = function (req, res, next) {
    //TODO : Projects - Handle options
    Project
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, projects) {
            if (err) return next(new DatabaseFindError());
            res.json({data: projects});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Projects - Create project for user
    return next(new NotImplementedError("Create a new project for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Projects - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of projects for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    Project
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};