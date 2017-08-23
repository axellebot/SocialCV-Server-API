"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData,
    getPageCount = require("../../helpers").getPageCount;

const ProgrammingLanguage = require('../../models/programmingLanguage.schema');

/* ProgrammingLanguages page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    ProgrammingLanguage
        .find(filter)
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

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var programmingLanguage = req.body.data;
    programmingLanguage.user = userId;
    programmingLanguage = new ProgrammingLanguage(programmingLanguage);

    programmingLanguage.save(function (err, programmingLanguageSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(programmingLanguageSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const programmingLanguages = req.body.data;
    var programmingLanguagesUpdated = [];
    Async.eachOf(programmingLanguages, function (programmingLanguage, key, callback) {
        const filterUpdate = {
            _id: programmingLanguage._id,
            user: userId
        };
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

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());
    ProgrammingLanguage
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};