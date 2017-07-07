var express = require('express');
var router = express.Router();

var utils = require("../utils");

const ProgrammingLanguage = require('../schemas/programmingLanguage.schema');

/* ProgrammingLanguages page. */
var PATH_PROGRAMMING_LANGUAGES = "/";
router
    .get(PATH_PROGRAMMING_LANGUAGES, function (req, res, next) {
        //TODO : ProgrammingLanguages - Handle options
        var pagination = utils.getPagination(req);

        ProgrammingLanguage
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, programmingLanguages) {
                if (err) return res.status(404).send(err);
                res.json({data:programmingLanguages});
            });
    })
    .post(PATH_PROGRAMMING_LANGUAGES, function (req, res, next) {
        //TODO : ProgrammingLanguages - Create programmingLanguage
        res.status(404).send('Create a ProgrammingLanguage');
    })
    .put(PATH_PROGRAMMING_LANGUAGES, function (req, res, next) {
        //TODO : ProgrammingLanguages - Add Bulk update
        res.status(404).send('Bulk update of programmingLanguages');
    })
    .delete(PATH_PROGRAMMING_LANGUAGES, function (req, res, next) {
        //TODO : ProgrammingLanguages - Remove all programmingLanguages
        res.status(404).send('Remove all programmingLanguages');
    });

/* ProgrammingLanguage page. */
var PATH_PROGRAMMING_LANGUAGE = PATH_PROGRAMMING_LANGUAGES + ":id";
router
    .get(PATH_PROGRAMMING_LANGUAGE, function (req, res, next) {
        ProgrammingLanguage
            .findById(req.params.id)
            .exec(function (err, programmingLanguage) {
                if (err) return res.status(404).send(err);
                res.json({data:programmingLanguage});
            });
    })
    .post(PATH_PROGRAMMING_LANGUAGE, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_PROGRAMMING_LANGUAGE, function (req, res, next) {
        //TODO : ProgrammingLanguage - Update programmingLanguage
        res.status(404).send('Bulk update of programmingLanguages');
    })
    .delete(PATH_PROGRAMMING_LANGUAGES, function (req, res, next) {
        //TODO : ProgrammingLanguage - Remove programmingLanguage
        res.status(404).send('Remove programmingLanguage');
    });

module.exports = router;