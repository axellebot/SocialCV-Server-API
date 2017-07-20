"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const LinkTag = require('../models/linkTag.schema');

const PARAM_ID = PARAM.PARAM_ID_LINK_TAG;

/* Links page. */
exports.linkTags = {};

exports.linkTags.get = function (req, res, next) {
    //TODO : LinkTags - Handle options
    LinkTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, linkTags) {
            if (err) return next(new DatabaseFindError());
            res.json({data: linkTags});
        });
};
exports.linkTags.post = function (req, res, next) {
    //TODO : LinkTags - Create link
    return next(new NotImplementedError("Create a new linkTag"));
};
exports.linkTags.put = function (req, res, next) {
    //TODO : LinkTags - Add Bulk update
    return next(new NotImplementedError("Bulk update of linkTags"));
};

exports.linkTags.delete = function (req, res, next) {
    LinkTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* LinkTag page. */
exports.linkTag = {};
exports.linkTag.get = function (req, res, next) {
    LinkTag
        .findById(req.params[PARAM_ID])
        .exec(function (err, linkTag) {
            if (err) return next(new DatabaseFindError());
            res.json({data: linkTag});
        });
};

exports.linkTag.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.linkTag.put = function (req, res, next) {
    //TODO : LinkTag - Update link
    return next(new NotImplementedError("Update details of linkTag " + req.params[PARAM_ID]));
};

exports.linkTag.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    LinkTag
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};