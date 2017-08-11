"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Language = require('../models/language.schema');

/* Languages page. */
exports.languages = {};
exports.languages.get = function (req, res, next) {
    Language
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, languages) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: languages});
        });
};

exports.languages.post = function (req, res, next) {
    var language = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) language.user = req.loggedUser._id;
    language = new Language(language);

    language.save(function (err, languageSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: languageSaved
            });
    });
};

exports.languages.put = function (req, res, next) {
    const languages = req.body.data;
    var languagesUpdated = [];
    Async.eachOf(languages, function (language, key, callback) {
        const filterUpdate = getFilterEditData(language._id, req.loggedUser);
        Language
            .findOneAndUpdate(filterUpdate, language, {new: true}, function (err, languageUpdated) {
                if (err) return callback(err);
                if (languageUpdated) languagesUpdated.push(languageUpdated);
                callback();
            });
    }, function (err) {
        if (err && languagesUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && languagesUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: languagesUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: languagesUpdated
            });
    });
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

exports.language.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_LANGUAGE], req.loggedUser);
    Language
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, language) {
            if (err) return next(new DatabaseUpdateError());
            if (!language) return next(new NotFoundError(MODEL_NAME_LANGUAGE));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: language});
        });
};

exports.language.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_LANGUAGE], req.loggedUser);
    Language
        .findOneAndRemove(filterRemove, function (err, language) {
            if (err) return next(new DatabaseRemoveError());
            if (!language) return next(new NotFoundError(MODEL_NAME_LANGUAGE));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: language});
        });
};