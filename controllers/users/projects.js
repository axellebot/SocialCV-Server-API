"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Project = require('../../models/project.schema');

/* Projects page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Project
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, projects) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: projects});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    var project = req.body.data;
    project.user = userId;
    project = new Project(project);

    project.save(function (err, projectSaved) {
        if (err) return next(new DatabaseCreateError());
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: projectSaved
            });
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const projects = req.body.data;
    var projectsUpdated = [];
    Async.eachOf(projects, function (project, key, callback) {
        const filterUpdate = {
            _id: project._id,
            user: userId
        };
        Project
            .findOneAndUpdate(filterUpdate, project, {new: true}, function (err, projectUpdated) {
                if (err) return callback(err);
                if (projectUpdated) projectsUpdated.push(projectUpdated);
                callback();
            });
    }, function (err) {
        if (err && projectsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && projectsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: projectsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: projectsUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    Project
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};