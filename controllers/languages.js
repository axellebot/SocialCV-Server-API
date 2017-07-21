"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Language = require('../models/language.schema');

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
            res.status(HTTP_STATUS_OK).json({data: languages});
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
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Language page. */
exports.language = {};
exports.language.get = function (req, res, next) {
    Language
        .findById(req.params[PARAM_ID_LANGUAGE])
        .exec(function (err, language) {
            if (err) return next(new DatabaseFindError());
            if (!language) return next(new NotFoundError(MODEL_NAME_LANGUAGE));
            res.status(HTTP_STATUS_OK).json({data: language});
        });
};

exports.language.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.language.put = function (req, res, next) {
    //TODO : Language - Update language
    return next(new NotImplementedError("Update details of language " + req.params[PARAM_ID_LANGUAGE]));
};

exports.language.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_LANGUAGE], req.decoded);
    Language
        .findOneAndRemove(optionRemove, function (err, language) {
            if (err) return next(new DatabaseRemoveError());
            if (!language) return next(new NotFoundError(MODEL_NAME_LANGUAGE));
            return res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: language});
        });
};