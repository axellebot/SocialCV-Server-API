"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Software = require('../models/software.schema');

const PARAM_ID = PARAM.PARAM_ID_SOFTWARE;

/* Softwares page. */
exports.softwares = {};
exports.softwares.get = function (req, res, next) {
    //TODO : Softwares - Handle options
    Software
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwares) {
            if (err) return next(new DatabaseFindError());
            res.json({data: softwares});
        });
};

exports.softwares.post = function (req, res, next) {
    //TODO : Softwares - Create software
    return next(new NotImplementedError("Create a new software"));
};

exports.softwares.put = function (req, res, next) {
    //TODO : Softwares - Add Bulk update
    return next(new NotImplementedError("Bulk update of softwares"));
};

exports.softwares.delete = function (req, res, next) {
    Software
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Software page. */
exports.software = {};
exports.software.get = function (req, res, next) {
    Software
        .findById(req.params[PARAM_ID])
        .exec(function (err, software) {
            if (err) return next(new DatabaseFindError());
            res.json({data: software});
        });
};

exports.software.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.software.put = function (req, res, next) {
    //TODO : Software - Update software
    return next(new NotImplementedError("Update details of software " + req.params[PARAM_ID]));
};

exports.software.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    Software
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};