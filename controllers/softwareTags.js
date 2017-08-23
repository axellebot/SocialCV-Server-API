"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const SoftwareTag = require('../models/softwareTag.schema');

/* SoftwareTags page. */
exports.softwareTags = {};
exports.softwareTags.get = function (req, res, next) {
    SoftwareTag
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, softwareTags) {
            if (err) return next(new DatabaseFindError());
            res.json(new SelectDocumentsResponse(softwareTags));
        });
};

exports.softwareTags.post = function (req, res, next) {
    var softwareTag = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) softwareTag.user = req.loggedUser._id;
    softwareTag = new SoftwareTag(softwareTag);

    softwareTag.save(function (err, softwareTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(softwareTagSaved));
    });
};

exports.softwareTags.put = function (req, res, next) {
    const softwareTags = req.body.data;
    var softwareTagsUpdated = [];
    Async.eachOf(softwareTags, function (softwareTag, key, callback) {
        const filterUpdate = getFilterEditData(softwareTag._id, req.loggedUser);
        SoftwareTag
            .findOneAndUpdate(filterUpdate, softwareTag, {new: true}, function (err, softwareTagUpdated) {
                if (err) return callback(err);
                if (softwareTagUpdated) softwareTagsUpdated.push(softwareTagUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(softwareTagsUpdated));
    });
};

exports.softwareTags.delete = function (req, res, next) {
    SoftwareTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};

/* SoftwareTag page. */
exports.softwareTag = {};
exports.softwareTag.get = function (req, res, next) {
    SoftwareTag
        .findById(req.params[PARAM_ID_SOFTWARE_TAG])
        .exec(function (err, softwareTag) {
            if (err) return next(new DatabaseFindError());
            if (!softwareTag) return next(new NotFoundError(MODEL_NAME_FRAMEWORK_TAG));
            res.json(new SelectDocumentResponse(softwareTag));
        });
};

exports.softwareTag.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_SOFTWARE_TAG], req.loggedUser);
    SoftwareTag
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, softwareTagUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!softwareTagUpdated) return next(new NotFoundError(MODEL_NAME_SOFTWARE_TAG));
            res.json(new UpdateDocumentResponse(softwareTagUpdated));
        });
};

exports.softwareTag.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_SOFTWARE_TAG], req.loggedUser);
    SoftwareTag
        .findOneAndRemove(filterRemove, function (err, softwareTagDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!softwareTagDeleted) return next(new NotFoundError(MODEL_NAME_SOFTWARE_TAG));
            res.json(new DeleteDocumentResponse(softwareTagDeleted));
        });
};