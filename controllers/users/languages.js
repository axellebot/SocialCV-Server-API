"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Language = require('../../models/language.schema');

/* Languages page. */
exports.get = function (req, res, next) {
    //TODO : Languages - Handle options
    Language
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, languages) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: languages});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Languages - Create language for user
    return next(new NotImplementedError("Create a new language for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Languages - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of languages for user : " + req.params[PARAM_ID_USER]));
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    Language
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};