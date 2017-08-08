"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Language = require('../../models/language.schema');

/* Languages page. */
exports.get = function (req, res, next) {
    //TODO : Languages - Handle options
    Language
        .find({user: req.params[PARAM_ID_USER]})
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, languages) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: languages});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Languages - Create language for user
    next(new NotImplementedError("Create a new language for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

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
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: languagesUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    Language
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};