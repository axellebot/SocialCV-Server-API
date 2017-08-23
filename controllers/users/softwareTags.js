"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData,
    getPageCount = require("../../helpers").getPageCount;

const SoftwareTag = require('../../models/softwareTag.schema');

/* SoftwareTags page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    SoftwareTag
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, softwareTags) {
            if (err) return next(new DatabaseFindError());
            if (!softwareTags || softwareTags.length <= 0) return next(new NotFoundError(MODEL_NAME_SOFTWARE_TAG));
            SoftwareTag
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(softwareTags, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var softwareTag = req.body.data;
    softwareTag.user = userId;
    softwareTag = new SoftwareTag(softwareTag);

    softwareTag.save(function (err, softwareTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(softwareTagSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const softwareTags = req.body.data;
    var softwareTagsUpdated = [];
    Async.eachOf(softwareTags, function (softwareTag, key, callback) {
        const filterUpdate = {
            _id: softwareTag._id,
            user: userId
        };
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

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    SoftwareTag
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};