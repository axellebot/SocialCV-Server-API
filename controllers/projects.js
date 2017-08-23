"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const Project = require('../models/project.schema');

/* Projects page. */
exports.projects = {};
exports.projects.get = function (req, res, next) {
    Project
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, projects) {
            if (err) return next(new DatabaseFindError());
            if (!projects || projects.length <= 0) return next(new NotFoundError(MODEL_NAME_PROJECT));
            Project
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(projects, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.projects.post = function (req, res, next) {
    var project = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) project.user = req.loggedUser._id;
    project = new Project(project);

    project.save(function (err, projectSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(projectSaved));
    });
};

exports.projects.put = function (req, res, next) {
    const projects = req.body.data;
    var projectsUpdated = [];
    Async.eachOf(projects, function (project, key, callback) {
        const filterUpdate = getFilterEditData(project._id, req.loggedUser);
        Project
            .findOneAndUpdate(filterUpdate, project, {new: true}, function (err, projectUpdated) {
                if (err) return callback(err);
                if (projectUpdated) projectsUpdated.push(projectUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(projectsUpdated));
    });
};

exports.projects.delete = function (req, res, next) {
    Project
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
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
            res.json(new SelectDocumentResponse(project));
        });
};

exports.project.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROJECT], req.loggedUser);
    Project
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, projectUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!projectUpdated) return next(new NotFoundError(MODEL_NAME_PROJECT));
            res.json(new UpdateDocumentResponse(projectUpdated));
        });
};

exports.project.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_PROJECT], req.loggedUser);
    Project
        .findOneAndRemove(filterRemove, function (err, projectDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!projectDeleted) return next(new NotFoundError(MODEL_NAME_PROJECT));
            res.json(new DeleteDocumentResponse(projectDeleted));
        });
};