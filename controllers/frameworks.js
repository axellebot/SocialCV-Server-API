"use strict";

const Framework = require('../models/framework.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_FRAMEWORK;

/* Frameworks page. */
exports.frameworks = {};
exports.frameworks.get = function (req, res, next) {
    //TODO : Frameworks - Handle options
    Framework
        .find({})
        .limit(req.pagination.limit)
        .skip(req.pagination.skip)
        .exec(function (err, frameworks) {
            if (err) return next(err);
            res.json({data: frameworks});
        });
};
exports.frameworks.post = function (req, res, next) {
    //TODO : Frameworks - Create framework
    res.status(404).send('Create a new Framework');
};
exports.frameworks.put = function (req, res, next) {
    //TODO : Frameworks - Add Bulk update
    res.status(404).send('Bulk update of frameworks');
};
exports.frameworks.delete = function (req, res, next) {
    //TODO : Frameworks - Remove all frameworks
    res.status(404).send('Remove all frameworks');
};

/* Framework page. */
exports.framework = {};
exports.framework.get = function (req, res, next) {
    Framework
        .findById(req.params[PARAM_ID])
        .exec(function (err, framework) {
            if (err) return next(err);
            res.json({data: framework});
        });
};
exports.framework.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.framework.put = function (req, res, next) {
    //TODO : Framework - Update framework
    res.status(404).send('Update details of frameworks');
};
exports.framework.delete = function (req, res, next) {
    //TODO : Framework - Remove framework
    res.status(404).send('Remove framework');
};