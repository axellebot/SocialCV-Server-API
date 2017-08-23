"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

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
            if (!languages || languages.length <= 0) return next(new NotFoundError(MODEL_NAME_LANGUAGE));
            Language
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(languages, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.languages.post = function (req, res, next) {
    var language = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) language.user = req.loggedUser._id;
    language = new Language(language);

    language.save(function (err, languageSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(languageSaved));
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
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(languagesUpdated));
    });
};

exports.languages.delete = function (req, res, next) {
    Language
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
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
            res.json(new SelectDocumentResponse(language));
        });
};

exports.language.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_LANGUAGE], req.loggedUser);
    Language
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, languageUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!languageUpdated) return next(new NotFoundError(MODEL_NAME_LANGUAGE));
            res.json(new UpdateDocumentResponse(languageUpdated));
        });
};

exports.language.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_LANGUAGE], req.loggedUser);
    Language
        .findOneAndRemove(filterRemove, function (err, languageDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!languageDeleted) return next(new NotFoundError(MODEL_NAME_LANGUAGE));
            res.json(new DeleteDocumentResponse(languageDeleted));
        });
};