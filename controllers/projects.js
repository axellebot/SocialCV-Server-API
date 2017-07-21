"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Project = require('../models/project.schema');

/* Projects page. */
exports.projects = {};
exports.projects.get = function (req, res, next) {
    //TODO : Projects - Handle options
    Project
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, projects) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: projects});
        });
};

exports.projects.post = function (req, res, next) {
    //TODO : Projects - Create project
    return next(new NotImplementedError("Create a new project'"));
};

exports.projects.put = function (req, res, next) {
    //TODO : Projects - Add Bulk update
    return next(new NotImplementedError("Bulk update of projects"));
};

exports.projects.delete = function (req, res, next) {
    Project
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Project page. */
exports.project = {};
exports.project.get = function (req, res, next) {
    Project
        .findById(req.params[PARAM_ID_PROJECT])
        .exec(function (err, project) {
            if (err) return next(new DatabaseFindError());
            if (!project) return next(new NotFoundError(MODEL_NAME_PROJECT));
            res.status(HTTP_STATUS_OK).json({data: project});
        });
};

exports.project.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.project.put = function (req, res, next) {
    //TODO : Project - Update project
    return next(new NotImplementedError("Update details of project " + req.params[PARAM_ID_PROJECT]));
};

exports.project.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_PROJECT], req.decoded);
    Project
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};