"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Language = require('../models/language.schema');

const PARAM_ID = PARAM.PARAM_ID_LANGUAGE;

/* Languages page. */
exports.languages = {};
exports.languages.get = function (req, res, next) {
    //TODO : Languages - Handle options
    Language
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, languages) {
            if (err) return next(new DatabaseFindError());
            res.json({data: languages});
        });
};

exports.languages.post = function (req, res, next) {
    //TODO : Languages - Create language
    return next(new NotImplementedError("Create a new Language"));
};

exports.languages.put = function (req, res, next) {
    //TODO : Languages - Add Bulk update
    return next(new NotImplementedError("Bulk update of languages"));
};

exports.languages.delete = function (req, res, next) {
    Language
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Language page. */
exports.language = {};
exports.language.get = function (req, res, next) {
    Language
        .findById(req.params[PARAM_ID])
        .exec(function (err, language) {
            if (err) return next(new DatabaseFindError());
            res.json({data: language});
        });
};

exports.language.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.language.put = function (req, res, next) {
    //TODO : Language - Update language
    return next(new NotImplementedError("Update details of language " + req.params[PARAM_ID]));
};

exports.language.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    Language
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};