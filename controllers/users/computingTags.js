"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const ComputingTag = require('../../models/computingTag.schema');

/* ComputingTags page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    ComputingTag
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, computingTags) {
            if (err) return next(new DatabaseFindError());
            res.json(new SelectDocumentsResponse(computingTags));
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var computingTag = req.body.data;
    computingTag.user = userId;
    computingTag = new ComputingTag(computingTag);

    computingTag.save(function (err, computingTagSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(computingTagSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const computingTags = req.body.data;
    var computingTagsUpdated = [];
    Async.eachOf(computingTags, function (computingTag, key, callback) {
        const filterUpdate = {
            _id: computingTag._id,
            user: userId
        };
        ComputingTag
            .findOneAndUpdate(filterUpdate, computingTag, {new: true}, function (err, computingTagUpdated) {
                if (err) return callback(err);
                if (computingTagUpdated) computingTagsUpdated.push(computingTagUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(computingTagsUpdated));
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    ComputingTag
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};