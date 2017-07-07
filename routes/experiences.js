var express = require('express');
var router = express.Router();

var utils = require("../utils");

const Experience = require('../schemas/experience.schema');

/* Experiences page. */
var PATH_EXPERIENCES = "/";
router
    .get(PATH_EXPERIENCES, function (req, res, next) {
        //TODO : Experiences - Handle options
        var pagination = utils.getPagination(req);

        Experience
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, experiences) {
                if (err) return res.status(404).send(err);
                res.json({data:experiences});
            });
    })
    .post(PATH_EXPERIENCES, function (req, res, next) {
        //TODO : Experiences - Create experience
        res.status(404).send('Create a Experience');
    })
    .put(PATH_EXPERIENCES, function (req, res, next) {
        //TODO : Experiences - Add Bulk update
        res.status(404).send('Bulk update of experiences');
    })
    .delete(PATH_EXPERIENCES, function (req, res, next) {
        //TODO : Experiences - Remove all experiences
        res.status(404).send('Remove all experiences');
    });

/* Experience page. */
var PATH_EXPERIENCE = PATH_EXPERIENCES + ":id";
router
    .get(PATH_EXPERIENCE, function (req, res, next) {
        Experience
            .findById(req.params.id)
            .exec(function (err, experience) {
                if (err) return res.status(404).send(err);
                res.json({data:experience});
            });
    })
    .post(PATH_EXPERIENCE, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_EXPERIENCE, function (req, res, next) {
        //TODO : Experience - Update experience
        res.status(404).send('Bulk update of experiences');
    })
    .delete(PATH_EXPERIENCES, function (req, res, next) {
        //TODO : Experience - Remove experience
        res.status(404).send('Remove experience');
    });

module.exports = router;