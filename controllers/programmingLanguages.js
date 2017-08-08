"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const ProgrammingLanguage = require('../models/programmingLanguage.schema');

/* ProgrammingLanguages page. */
exports.programmingLanguages = {};
exports.programmingLanguages.get = function (req, res, next) {
    //TODO : ProgrammingLanguages - Handle options
    ProgrammingLanguage
        .find({})
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
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
    const programmingLanguages = req.body.data;
    var programmingLanguagesUpdated = [];
    Async.eachOf(programmingLanguages, function (programmingLanguage, key, callback) {
        const filterUpdate = getFilterEditData(programmingLanguage._id, req.decoded);
        ProgrammingLanguage
            .findOneAndUpdate(filterUpdate, programmingLanguage, {new: true}, function (err, programmingLanguageUpdated) {
                if (err) return callback(err);
                if (programmingLanguageUpdated) programmingLanguagesUpdated.push(programmingLanguageUpdated);
                callback();
            });
    }, function (err) {
        if (err && programmingLanguagesUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && programmingLanguagesUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: programmingLanguagesUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: programmingLanguagesUpdated
            });
    });
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

exports.programmingLanguage.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROGRAMMING_LANGUAGE], req.decoded);
    ProgrammingLanguage
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, programmingLanguage) {
            if (err) return next(new DatabaseUpdateError());
            if (!programmingLanguage) return next(new NotFoundError(MODEL_NAME_PROGRAMMING_LANGUAGE));
            res
                .status(HTTP_STATUS_OK)
                .json({
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