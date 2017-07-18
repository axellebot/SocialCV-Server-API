"use strict";

const Education = require('../models/education.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_EDUCATION;

/* Educations page. */
exports.educations = {};
exports.educations.get = function (req, res, next) {
    //TODO : Educations - Handle options
    Education
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, educations) {
            if (err) return next(err);
            res.json({data: educations});
        });
};
exports.educations.post = function (req, res, next) {
    //TODO : Educations - Create education
    res.status(404).send('Create a new Education');
};
exports.educations.put = function (req, res, next) {
    //TODO : Educations - Add Bulk update
    res.status(404).send('Bulk update of educations');
};
exports.educations.delete = function (req, res, next) {
    //TODO : Educations - Remove all educations
    res.status(404).send('Remove all educations');
};

/* Education page. */
exports.education = {};
exports.education.get = function (req, res, next) {
    Education
        .findById(req.params[PARAM_ID])
        .exec(function (err, education) {
            if (err) return next(err);
            res.json({data: education});
        });
};
exports.education.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.education.put = function (req, res, next) {
    //TODO : Education - Update education
    res.status(404).send('Update details of education');
};
exports.education.delete = function (req, res, next) {
    //TODO : Education - Remove education
    res.status(404).send('Remove education');
};