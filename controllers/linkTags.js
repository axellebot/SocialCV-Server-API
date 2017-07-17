"use strict";

var getPagination = require("../helpers").getPagination;

const LinkTag = require('../models/linkTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_LINK_TAG;

/* Links page. */
exports.linkTags = {};

exports.linkTags.get = function (req, res, next) {
    //TODO : LinkTags - Handle options
    var pagination = getPagination(req);
    LinkTag
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, linkTags) {
            if (err) return next(err);
            res.json({data: linkTags});
        });
};
exports.linkTags.post = function (req, res, next) {
    //TODO : LinkTags - Create link
    res.status(404).send('Create a new LinkTag');
};
exports.linkTags.put = function (req, res, next) {
    //TODO : LinkTags - Add Bulk update
    res.status(404).send('Bulk update of links');
};
exports.linkTags.delete = function (req, res, next) {
    //TODO : LinkTags - Remove all links
    res.status(404).send('Remove all links');
};

/* LinkTag page. */
exports.linkTag = {};
exports.linkTag.get = function (req, res, next) {
    LinkTag
        .findById(req.params[PARAM_ID])
        .exec(function (err, linkTag) {
            if (err) return next(err);
            res.json({data: linkTag});
        });
};
exports.linkTag.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.linkTag.put = function (req, res, next) {
    //TODO : LinkTag - Update link
    res.status(404).send('Update details of links');
};
exports.linkTag.delete = function (req, res, next) {
    //TODO : LinkTag - Remove link
    res.status(404).send('Remove link');
};