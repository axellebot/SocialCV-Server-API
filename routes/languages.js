var express = require('express');
var router = express.Router();

var utils = require("../helpers");

const Language = require('../models/language.schema');

/* Languages page. */
var PATH_LANGUAGES = "/";
router
    .get(PATH_LANGUAGES, function (req, res, next) {
        //TODO : Languages - Handle options
        var pagination = utils.getPagination(req);

        Language
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, languages) {
                if (err) return next(err);
                res.json({data:languages});
            });
    })
    .post(PATH_LANGUAGES, function (req, res, next) {
        //TODO : Languages - Create language
        res.status(404).send('Create a Language');
    })
    .put(PATH_LANGUAGES, function (req, res, next) {
        //TODO : Languages - Add Bulk update
        res.status(404).send('Bulk update of languages');
    })
    .delete(PATH_LANGUAGES, function (req, res, next) {
        //TODO : Languages - Remove all languages
        res.status(404).send('Remove all languages');
    });

/* Language page. */
var PATH_LANGUAGE = PATH_LANGUAGES + ":id";
router
    .get(PATH_LANGUAGE, function (req, res, next) {
        Language
            .findById(req.params.id)
            .exec(function (err, language) {
                if (err) return next(err);
                res.json({data:language});
            });
    })
    .post(PATH_LANGUAGE, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_LANGUAGE, function (req, res, next) {
        //TODO : Language - Update language
        res.status(404).send('Bulk update of languages');
    })
    .delete(PATH_LANGUAGES, function (req, res, next) {
        //TODO : Language - Remove language
        res.status(404).send('Remove language');
    });

module.exports = router;