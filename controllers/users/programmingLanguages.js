"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

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
            res.status(HTTP_STATUS_OK).json({data: programmingLanguages});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    var programmingLanguage = req.body.data;
    programmingLanguage.user = userId;
    programmingLanguage = new ProgrammingLanguage(programmingLanguage);

    programmingLanguage.save(function (err, programmingLanguageSaved) {
        if (err) return next(new DatabaseCreateError());
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: programmingLanguageSaved
            });
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

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
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: programmingLanguagesUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    ProgrammingLanguage
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};