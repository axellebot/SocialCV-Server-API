"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const ProgrammingLanguage = require('../models/programmingLanguage.schema');

/* ProgrammingLanguages page. */
exports.programmingLanguages = {};
exports.programmingLanguages.get = function (req, res, next) {
    //TODO : ProgrammingLanguages - Handle options
    ProgrammingLanguage
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, programmingLanguages) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: programmingLanguages});
        });
};
exports.programmingLanguages.post = function (req, res, next) {
    //TODO : ProgrammingLanguages - Create programmingLanguage
    next(new NotImplementedError("Create a new programmingLanguage"));
};
exports.programmingLanguages.put = function (req, res, next) {
    //TODO : ProgrammingLanguages - Add Bulk update
    next(new NotImplementedError("Bulk update of programmingLanguages"));
};
exports.programmingLanguages.delete = function (req, res, next) {
    ProgrammingLanguage
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* ProgrammingLanguage page. */
exports.programmingLanguage = {};
exports.programmingLanguage.get = function (req, res, next) {
    ProgrammingLanguage
        .findById(req.params[PARAM_ID_PROGRAMMING_LANGUAGE])
        .exec(function (err, programmingLanguage) {
            if (err) return next(new DatabaseFindError());
            if (!programmingLanguage) return next(new NotFoundError(MODEL_NAME_PROGRAMMING_LANGUAGE));
            res.status(HTTP_STATUS_OK).json({data: programmingLanguage});
        });
};

exports.programmingLanguage.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.programmingLanguage.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROGRAMMING_LANGUAGE], req.decoded);
    ProgrammingLanguage
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true},function (err, programmingLanguage) {
            if (err) return next(new DatabaseUpdateError());
            if (!programmingLanguage) return next(new NotFoundError(MODEL_NAME_PROGRAMMING_LANGUAGE));
            return res.status(HTTP_STATUS_OK).json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: programmingLanguage
            });
        });
};

exports.programmingLanguage.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_PROGRAMMING_LANGUAGE], req.decoded);
    ProgrammingLanguage
        .findOneAndRemove(filterRemove, function (err, programmingLanguage) {
            if (err) return next(new DatabaseRemoveError());
            if (!programmingLanguage) return next(new NotFoundError(MODEL_NAME_PROGRAMMING_LANGUAGE));
            res.status(HTTP_STATUS_OK).json({
                message: MESSAGE_SUCCESS_RESOURCE_DELETED,
                data: programmingLanguage
            });
        });
};