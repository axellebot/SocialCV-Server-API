"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Language = require('../../models/language.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Languages page. */
exports.get = function (req, res, next) {
    //TODO : Languages - Handle options
    Language
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, languages) {
            if (err) return next(new DatabaseFindError());
            res.json({data: languages});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Languages - Create language for user
    return next(new NotImplementedError("Create a new language for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Languages - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of languages for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    Language
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};