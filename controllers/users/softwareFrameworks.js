"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData,
    getPageCount = require("../../helpers").getPageCount;

const SoftwareFramework = require('../../models/softwareFramework.schema');

/* SoftwareFrameworks page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    SoftwareFramework
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, softwareFrameworks) {
            if (err) return next(new DatabaseFindError());
            if (!softwareFrameworks || softwareFrameworks.length <= 0) return next(new NotFoundError(MODEL_NAME_SOFTWARE_FRAMEWORK));
            SoftwareFramework
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(softwareFrameworks, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var softwareFramework = req.body.data;
    softwareFramework.user = userId;
    softwareFramework = new Interest(softwareFramework);

    softwareFramework.save(function (err, softwareFrameworkSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(softwareFrameworkSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const softwareFrameworks = req.body.data;
    var softwareFrameworksUpdated = [];
    Async.eachOf(softwareFrameworks, function (softwareFramework, key, callback) {
        const filterUpdate = {
            _id: softwareFramework._id,
            user: userId
        };
        SoftwareFramework
            .findOneAndUpdate(filterUpdate, softwareFramework, {new: true}, function (err, softwareFrameworkUpdated) {
                if (err) return callback(err);
                if (softwareFrameworkUpdated) softwareFrameworksUpdated.push(softwareFrameworkUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(softwareFrameworksUpdated));
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    SoftwareFramework
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};