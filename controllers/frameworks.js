"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Framework = require('../models/framework.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_FRAMEWORK;

/* Frameworks page. */
exports.frameworks = {};
exports.frameworks.get = function (req, res, next) {
    //TODO : Frameworks - Handle options
    Framework
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, frameworks) {
            if (err) return next(new DatabaseFindError());
            res.json({data: frameworks});
        });
};

exports.frameworks.post = function (req, res, next) {
    //TODO : Frameworks - Create framework
    return next(new NotImplementedError("Create a new framework"));
};

exports.frameworks.put = function (req, res, next) {
    //TODO : Frameworks - Add Bulk update
    return next(new NotImplementedError("Bulk update of frameworks"));
};

exports.frameworks.delete = function (req, res, next) {
    Framework
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Framework page. */
exports.framework = {};
exports.framework.get = function (req, res, next) {
    Framework
        .findById(req.params[PARAM_ID])
        .exec(function (err, framework) {
            if (err) return next(new DatabaseFindError());
            res.json({data: framework});
        });
};

exports.framework.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.framework.put = function (req, res, next) {
    //TODO : Framework - Update framework
    return next(new NotImplementedError("Update details of frameworks "+ req.params[PARAM_ID]));
};

exports.framework.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    Framework
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};