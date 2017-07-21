"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const LinkTag = require('../models/linkTag.schema');

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
            res.status(HTTP_STATUS_OK).json({data: linkTags});
        });
};
exports.linkTags.post = function (req, res, next) {
    //TODO : LinkTags - Create link
    next(new NotImplementedError("Create a new linkTag"));
};
exports.linkTags.put = function (req, res, next) {
    //TODO : LinkTags - Add Bulk update
    next(new NotImplementedError("Bulk update of linkTags"));
};

exports.linkTags.delete = function (req, res, next) {
    LinkTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* LinkTag page. */
exports.linkTag = {};
exports.linkTag.get = function (req, res, next) {
    LinkTag
        .findById(req.params[PARAM_ID_LINK_TAG])
        .exec(function (err, linkTag) {
            if (err) return next(new DatabaseFindError());
            if (!linkTag) return next(new NotFoundError(MODEL_NAME_LINK_TAG));
            res.status(HTTP_STATUS_OK).json({data: linkTag});
        });
};

exports.linkTag.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.linkTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_LINK_TAG], req.decoded);
    LinkTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, linkTag) {
            if (err) return next(new DatabaseUpdateError());
            if (!linkTag) return next(new NotFoundError(MODEL_NAME_LINK_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: linkTag});
        });
};

exports.linkTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_LINK_TAG], req.decoded);
    LinkTag
        .findOneAndRemove(filterRemove, function (err, linkTag) {
            if (err) return next(new DatabaseRemoveError());
            if (!linkTag) return next(new NotFoundError(MODEL_NAME_LINK_TAG));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: linkTag});
        });
};