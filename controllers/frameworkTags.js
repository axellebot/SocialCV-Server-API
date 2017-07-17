"use strict";

var getPagination = require("../helpers").getPagination;

const FrameworkTag = require('../models/frameworkTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_FRAMEWORK_TAG;

/* FrameworkTags page. */
exports.frameworkTags = {};
exports.frameworkTags.get = function (req, res, next) {
    //TODO : FrameworkTags - Handle options
    var pagination = getPagination(req);

    FrameworkTag
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, FrameworkTags) {
            if (err) return next(err);
            res.json({data: FrameworkTags});
        });
};
exports.frameworkTags.post = function (req, res, next) {
    //TODO : FrameworkTags - Create frameworkTag
    res.status(404).send('Create a new FrameworkTag');
};
exports.frameworkTags.put = function (req, res, next) {
    //TODO : FrameworkTags - Add Bulk update
    res.status(404).send('Bulk update of frameworkTags');
};
exports.frameworkTags.delete = function (req, res, next) {
    //TODO : FrameworkTags - Remove all frameworkTags
    res.status(404).send('Remove all frameworkTags');
};

/* FrameworkTag page. */
exports.frameworkTag = {};
exports.frameworkTag.get = function (req, res, next) {
    FrameworkTag
        .findById(req.params[PARAM_ID])
        .exec(function (err, FrameworkTag) {
            if (err) return next(err);
            res.json({data: FrameworkTag});
        });
};
exports.frameworkTag.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.frameworkTag.put = function (req, res, next) {
    //TODO : FrameworkTag - Update frameworkTag
    res.status(404).send('Update details of frameworkTags');
};
exports.frameworkTag.delete = function (req, res, next) {
    //TODO : FrameworkTag - Remove frameworkTag
    res.status(404).send('Remove frameworkTag');
};