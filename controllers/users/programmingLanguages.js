"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const ProgrammingLanguage = require('../../models/programmingLanguage.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* ProgrammingLanguages page. */
exports.get = function (req, res, next) {
    //TODO : ProgrammingLanguages - Handle options
    ProgrammingLanguage
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, programmingLanguages) {
            if (err) return next(new DatabaseFindError());
            res.json({data: programmingLanguages});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : ProgrammingLanguages - Create programmingLanguage for user
    return next(new NotImplementedError("Create a new programmingLanguage for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : ProgrammingLanguages - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of programmingLanguages for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    ProgrammingLanguage
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};