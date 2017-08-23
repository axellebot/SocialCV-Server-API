"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const SoftwareFramework = require('../models/softwareFramework.schema');

/* SoftwareFrameworks page. */
exports.softwareFrameworks = {};
exports.softwareFrameworks.get = function (req, res, next) {
    SoftwareFramework
        .find(req.queryParsed.filter)
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

exports.softwareFrameworks.post = function (req, res, next) {
    var softwareFramework = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) softwareFramework.user = req.loggedUser._id;
    softwareFramework = new ComputingTag(softwareFramework);

    softwareFramework.save(function (err, softwareFrameworkSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(softwareFrameworkSaved));
    });
};

exports.softwareFrameworks.put = function (req, res, next) {
    const softwareFrameworks = req.body.data;
    var softwareFrameworksUpdated = [];
    Async.eachOf(softwareFrameworks, function (softwareFramework, key, callback) {
        const filterUpdate = getFilterEditData(softwareFramework._id, req.loggedUser);
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

exports.softwareFrameworks.delete = function (req, res, next) {
    SoftwareFramework
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};

/* SoftwareFramework page. */
exports.softwareFramework = {};
exports.softwareFramework.get = function (req, res, next) {
    SoftwareFramework
        .findById(req.params[PARAM_ID_SOFTWARE_FRAMEWORK])
        .exec(function (err, softwareFramework) {
            if (err) return next(new DatabaseFindError());
            if (!softwareFramework) return next(new NotFoundError(MODEL_NAME_SOFTWARE_FRAMEWORK));
            res.json(new SelectDocumentResponse(softwareFramework));
        });
};

exports.softwareFramework.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_SOFTWARE_FRAMEWORK], req.loggedUser);
    SoftwareFramework
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, softwareFrameworkUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!softwareFrameworkUpdated) return next(new NotFoundError(MODEL_NAME_SOFTWARE_FRAMEWORK));
            res.json(new UpdateDocumentResponse(softwareFrameworkUpdated));
        });
};

exports.softwareFramework.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_SOFTWARE_FRAMEWORK], req.loggedUser);
    SoftwareFramework
        .findOneAndRemove(filterRemove, function (err, softwareFrameworkDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!softwareFrameworkDeleted) return next(new NotFoundError(MODEL_NAME_SOFTWARE_FRAMEWORK));
            res.json(new DeleteDocumentResponse(softwareFrameworkDeleted));
        });
};