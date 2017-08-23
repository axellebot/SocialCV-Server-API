"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData,
    getPageCount = require("../../helpers").getPageCount;

const Language = require('../../models/language.schema');

/* Languages page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Language
        .find(filter)
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

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var language = req.body.data;
    language.user = userId;
    language = new Language(language);

    language.save(function (err, languageSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(languageSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const languages = req.body.data;
    var languagesUpdated = [];
    Async.eachOf(languages, function (language, key, callback) {
        const filterUpdate = {
            _id: language._id,
            user: userId
        };
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

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    Language
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};