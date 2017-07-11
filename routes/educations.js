var express = require('express');
var router = express.Router();

var utils = require("../helpers");

const Education = require('../models/education.schema');

/* Educations page. */
var PATH_EDUCATIONS = "/";
router
    .get(PATH_EDUCATIONS, function (req, res, next) {
        //TODO : Educations - Handle options
        var pagination = utils.getPagination(req);

        Education
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, educations) {
                if (err) return next(err);
                res.json({data:educations});
            });
    })
    .post(PATH_EDUCATIONS, function (req, res, next) {
        //TODO : Educations - Create education
        res.status(404).send('Create a Education');
    })
    .put(PATH_EDUCATIONS, function (req, res, next) {
        //TODO : Educations - Add Bulk update
        res.status(404).send('Bulk update of educations');
    })
    .delete(PATH_EDUCATIONS, function (req, res, next) {
        //TODO : Educations - Remove all educations
        res.status(404).send('Remove all educations');
    });

/* Education page. */
var PATH_EDUCATION = PATH_EDUCATIONS + ":id";
router
    .get(PATH_EDUCATION, function (req, res, next) {
        Education
            .findById(req.params.id)
            .exec(function (err, education) {
                if (err) return next(err);
                res.json({data:education});
            });
    })
    .post(PATH_EDUCATION, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_EDUCATION, function (req, res, next) {
        //TODO : Education - Update education
        res.status(404).send('Bulk update of educations');
    })
    .delete(PATH_EDUCATIONS, function (req, res, next) {
        //TODO : Education - Remove education
        res.status(404).send('Remove education');
    });

module.exports = router;