"use strict";

var getPagination = require("../helpers").getPagination;

const Language = require('../models/language.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_LANGUAGE;

/* Languages page. */
exports.languages = {};
exports.languages.get = function (req, res, next) {
    //TODO : Languages - Handle options
    var pagination = getPagination(req);
    Language
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, languages) {
            if (err) return next(err);
            res.json({data: languages});
        });
};
exports.languages.post = function (req, res, next) {
    //TODO : Languages - Create language
    res.status(404).send('Create a new Language');
};
exports.languages.put = function (req, res, next) {
    //TODO : Languages - Add Bulk update
    res.status(404).send('Bulk update of languages');
};
exports.languages.delete = function (req, res, next) {
    //TODO : Languages - Remove all languages
    res.status(404).send('Remove all languages');
};

/* Language page. */
exports.language = {};
exports.language.get = function (req, res, next) {
    Language
        .findById(req.params[PARAM_ID])
        .exec(function (err, language) {
            if (err) return next(err);
            res.json({data: language});
        });
};
exports.language.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.language.put = function (req, res, next) {
    //TODO : Language - Update language
    res.status(404).send('Update details of languages');
};
exports.language.delete = function (req, res, next) {
    //TODO : Language - Remove language
    res.status(404).send('Remove language');
};