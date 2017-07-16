var getPagination = require("../helpers").getPagination;

const Project = require('../models/project.schema');

/* Projects page. */
exports.projects = {};
exports.projects.get = function (req, res, next) {
    //TODO : Projects - Handle options
    var pagination = getPagination(req);
    Project
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, projects) {
            if (err) return next(err);
            res.json({data: projects});
        });
};
exports.projects.post = function (req, res, next) {
    //TODO : Projects - Create project
    res.status(404).send('Create a new Project');
};
exports.projects.put = function (req, res, next) {
    //TODO : Projects - Add Bulk update
    res.status(404).send('Bulk update of projects');
};
exports.projects.delete = function (req, res, next) {
    //TODO : Projects - Remove all projects
    res.status(404).send('Remove all projects');
};

/* Project page. */
exports.project = {};
exports.project.get = function (req, res, next) {
    Project
        .findById(req.params.id)
        .exec(function (err, project) {
            if (err) return next(err);
            res.json({data: project});
        });
};
exports.project.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.project.put = function (req, res, next) {
    //TODO : Project - Update project
    res.status(404).send('Update details of project');
};
exports.project.delete = function (req, res, next) {
    //TODO : Project - Remove project
    res.status(404).send('Remove project');
};