"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const ProgrammingLanguage = require('../models/programmingLanguage.schema');

const PARAM_ID = PARAM.PARAM_ID_PROGRAMMING_LANGUAGE;

/* ProgrammingLanguages page. */
exports.programmingLanguages = {};
exports.programmingLanguages.get = function (req, res, next) {
    //TODO : ProgrammingLanguages - Handle options
    ProgrammingLanguage
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, programmingLanguages) {
            if (err) return next(new DatabaseFindError());
            res.json({data: programmingLanguages});
        });
};
exports.programmingLanguages.post = function (req, res, next) {
    //TODO : ProgrammingLanguages - Create programmingLanguage
    return next(new NotImplementedError("Create a new programmingLanguage"));
};
exports.programmingLanguages.put = function (req, res, next) {
    //TODO : ProgrammingLanguages - Add Bulk update
    return next(new NotImplementedError("Bulk update of programmingLanguages"));
};
exports.programmingLanguages.delete = function (req, res, next) {
    ProgrammingLanguage
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* ProgrammingLanguage page. */
exports.programmingLanguage = {};
exports.programmingLanguage.get = function (req, res, next) {
    ProgrammingLanguage
        .findById(req.params[PARAM_ID])
        .exec(function (err, programmingLanguage) {
            if (err) return next(new DatabaseFindError());
            res.json({data: programmingLanguage});
        });
};

exports.programmingLanguage.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.programmingLanguage.put = function (req, res, next) {
    //TODO : ProgrammingLanguage - Update programmingLanguage
    return next(new NotImplementedError("Update details of programmingLanguage " + req.params[PARAM_ID]));
};

exports.programmingLanguage.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    ProgrammingLanguage
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};