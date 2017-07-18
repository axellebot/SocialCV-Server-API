"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Software = require('../models/software.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_SOFTWARE;

/* Softwares page. */
exports.softwares = {};
exports.softwares.get = function (req, res, next) {
    //TODO : Softwares - Handle options
    Software
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwares) {
            if (err) return next(err);
            res.json({data: softwares});
        });
};
exports.softwares.post = function (req, res, next) {
    //TODO : Softwares - Create software
    res.status(404).send('Create a new Software');
};
exports.softwares.put = function (req, res, next) {
    //TODO : Softwares - Add Bulk update
    res.status(404).send('Bulk update of softwares');
};
exports.softwares.delete = function (req, res, next) {
    Software
        .remove()
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Software page. */
exports.software = {};
exports.software.get = function (req, res, next) {
    Software
        .findById(req.params[PARAM_ID])
        .exec(function (err, software) {
            if (err) return next(err);
            res.json({data: software});
        });
};
exports.software.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.software.put = function (req, res, next) {
    //TODO : Software - Update software
    res.status(404).send('Update details of softwares');
};
exports.software.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    Software
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};