"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const LinkTag = require('../models/linkTag.schema');

/* Links page. */
exports.linkTags = {};

exports.linkTags.get = function (req, res, next) {
    LinkTag
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, linkTags) {
            if (err) return next(new DatabaseFindError());
            LinkTag
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(linkTags, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};
exports.linkTags.post = function (req, res, next) {
    var linkTag = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) linkTag.user = req.loggedUser._id;
    linkTag = new LinkTag(linkTag);

    linkTag.save(function (err, linkTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(linkTagSaved));
    });
};
exports.linkTags.put = function (req, res, next) {
    const linkTags = req.body.data;
    var linkTagsUpdated = [];
    Async.eachOf(linkTags, function (linkTag, key, callback) {
        const filterUpdate = getFilterEditData(linkTag._id, req.loggedUser);
        LinkTag
            .findOneAndUpdate(filterUpdate, linkTag, {new: true}, function (err, linkTagUpdated) {
                if (err) return callback(err);
                if (linkTagUpdated) linkTagsUpdated.push(linkTagUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(linkTagsUpdated));
    });
};

exports.linkTags.delete = function (req, res, next) {
    LinkTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
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
            res.json(new SelectDocumentResponse(linkTag));
        });
};

exports.linkTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_LINK_TAG], req.loggedUser);
    LinkTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, linkTagUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!linkTagUpdated) return next(new NotFoundError(MODEL_NAME_LINK_TAG));
            res.json(new UpdateDocumentResponse(linkTagUpdated));
        });
};

exports.linkTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_LINK_TAG], req.loggedUser);
    LinkTag
        .findOneAndRemove(filterRemove, function (err, linkTagDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!linkTagDeleted) return next(new NotFoundError(MODEL_NAME_LINK_TAG));
            res.json(new DeleteDocumentResponse(linkTagDeleted));
        });
};