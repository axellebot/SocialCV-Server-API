var getPagination = require("../../helpers").getPagination;

const Project = require('../../models/project.schema');

/* Projects page. */
exports.get = function (req, res, next) {
    //TODO : Projects - Handle options
    var pagination = getPagination(req);
    Project
        .find({user: req.params.id})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, projects) {
            if (err) return next(err);
            res.json({data: projects});
        });
};
exports.post = function (req, res, next) {
    //TODO : Projects - Create project for user
    res.status(404).send('Create a new Project for user : ' + req.params.id);
};
exports.put = function (req, res, next) {
    //TODO : Projects - Add Bulk update for user
    res.status(404).send('Bulk update of projects for user : ' + req.params.id);
};
exports.delete = function (req, res, next) {
    //TODO : Projects - Remove all projects for user
    res.status(404).send('Remove all projects for user : ' + req.params.id);
};