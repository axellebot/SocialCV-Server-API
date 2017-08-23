"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const ProgrammingLanguage = require('../models/programmingLanguage.schema');

/* ProgrammingLanguages page. */
exports.programmingLanguages = {};
exports.programmingLanguages.get = function (req, res, next) {
    ProgrammingLanguage
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, programmingLanguages) {
            if (err) return next(new DatabaseFindError());
            if (!programmingLanguages || programmingLanguages.length <= 0) return next(new NotFoundError(MODEL_NAME_PROGRAMMING_LANGUAGE));
            ProgrammingLanguage
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(programmingLanguages, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};
exports.programmingLanguages.post = function (req, res, next) {
    var programmingLanguage = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) programmingLanguage.user = req.loggedUser._id;
    programmingLanguage = new ProgrammingLanguage(programmingLanguage);

    programmingLanguage.save(function (err, programmingLanguageSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(programmingLanguageSaved));
    });
};
exports.programmingLanguages.put = function (req, res, next) {
    const programmingLanguages = req.body.data;
    var programmingLanguagesUpdated = [];
    Async.eachOf(programmingLanguages, function (programmingLanguage, key, callback) {
        const filterUpdate = getFilterEditData(programmingLanguage._id, req.loggedUser);
        ProgrammingLanguage
            .findOneAndUpdate(filterUpdate, programmingLanguage, {new: true}, function (err, programmingLanguageUpdated) {
                if (err) return callback(err);
                if (programmingLanguageUpdated) programmingLanguagesUpdated.push(programmingLanguageUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(programmingLanguagesUpdated));
    });
};
exports.programmingLanguages.delete = function (req, res, next) {
    ProgrammingLanguage
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
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
            res.json(new SelectDocumentResponse(programmingLanguage));
        });
};

exports.programmingLanguage.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROGRAMMING_LANGUAGE], req.loggedUser);
    ProgrammingLanguage
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, programmingLanguageUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!programmingLanguageUpdated) return next(new NotFoundError(MODEL_NAME_PROGRAMMING_LANGUAGE));
            res.json(new UpdateDocumentResponse(programmingLanguageUpdated));
        });
};

exports.programmingLanguage.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_PROGRAMMING_LANGUAGE], req.loggedUser);
    ProgrammingLanguage
        .findOneAndRemove(filterRemove, function (err, programmingLanguageDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!programmingLanguageDeleted) return next(new NotFoundError(MODEL_NAME_PROGRAMMING_LANGUAGE));
            res.json(new DeleteDocumentResponse(programmingLanguageDeleted));
        });
};