var express = require('express');
var router = express.Router();

var utils = require("../utils");

const Project = require('../schemas/project.schema');

/* Projects page. */
var PATH_PROJECTS = "/";
router
    .get(PATH_PROJECTS, function (req, res, next) {
        //TODO : Projects - Handle options
        var pagination = utils.getPagination(req);

        Project
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, projects) {
                if (err) return res.status(404).send(err);
                res.json({data:projects});
            });
    })
    .post(PATH_PROJECTS, function (req, res, next) {
        //TODO : Projects - Create project
        res.status(404).send('Create a Project');
    })
    .put(PATH_PROJECTS, function (req, res, next) {
        //TODO : Projects - Add Bulk update
        res.status(404).send('Bulk update of projects');
    })
    .delete(PATH_PROJECTS, function (req, res, next) {
        //TODO : Projects - Remove all projects
        res.status(404).send('Remove all projects');
    });

/* Project page. */
var PATH_PROJECT = PATH_PROJECTS + ":id";
router
    .get(PATH_PROJECT, function (req, res, next) {
        Project
            .findById(req.params.id)
            .exec(function (err, project) {
                if (err) return res.status(404).send(err);
                res.json({data:project});
            });
    })
    .post(PATH_PROJECT, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_PROJECT, function (req, res, next) {
        //TODO : Project - Update project
        res.status(404).send('Bulk update of projects');
    })
    .delete(PATH_PROJECTS, function (req, res, next) {
        //TODO : Project - Remove project
        res.status(404).send('Remove project');
    });

module.exports = router;