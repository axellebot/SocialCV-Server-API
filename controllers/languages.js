"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

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
    next(new NotImplementedError("Create a new Language"));
};

exports.languages.put = function (req, res, next) {
    //TODO : Languages - Add Bulk update
    next(new NotImplementedError("Bulk update of languages"));
};

exports.languages.delete = function (req, res, next) {
    Language
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
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
    next(new NotFoundError());
};

exports.language.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_LANGUAGE], req.decoded);
    Language
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, language) {
            if (err) return next(new DatabaseUpdateError());
            if (!language) return next(new NotFoundError(MODEL_NAME_LANGUAGE));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: language});
        });
};

exports.language.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_LANGUAGE], req.decoded);
    Language
        .findOneAndRemove(filterRemove, function (err, language) {
            if (err) return next(new DatabaseRemoveError());
            if (!language) return next(new NotFoundError(MODEL_NAME_LANGUAGE));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: language});
        });
};