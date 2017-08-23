"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const Framework = require('../models/framework.schema');

/* Frameworks page. */
exports.frameworks = {};
exports.frameworks.get = function (req, res, next) {
    Framework
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, frameworks) {
            if (err) return next(new DatabaseFindError());
            Framework
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(frameworks, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.frameworks.post = function (req, res, next) {
    var framework = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) framework.user = req.loggedUser._id;
    framework = new Framework(framework);

    framework.save(function (err, frameworkSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(frameworkSaved));
    });
};

exports.frameworks.put = function (req, res, next) {
    const frameworks = req.body.data;
    var frameworksUpdated = [];
    Async.eachOf(frameworks, function (framework, key, callback) {
        const filterUpdate = getFilterEditData(framework._id, req.loggedUser);
        Framework
            .findOneAndUpdate(filterUpdate, framework, {new: true}, function (err, frameworkUpdated) {
                if (err) return callback(err);
                if (frameworkUpdated) frameworksUpdated.push(frameworkUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(frameworksUpdated));
    });
};

exports.frameworks.delete = function (req, res, next) {
    Framework
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};

/* Framework page. */
exports.framework = {};
exports.framework.get = function (req, res, next) {
    Framework
        .findById(req.params[PARAM_ID_FRAMEWORK])
        .exec(function (err, framework) {
            if (err) return next(new DatabaseFindError());
            if (!framework) return next(new NotFoundError(MODEL_NAME_FRAMEWORK));
            res.json(new SelectDocumentResponse(framework));
        });
};

exports.framework.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_FRAMEWORK], req.loggedUser);
    Framework
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, frameworkUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!frameworkUpdated) return next(new NotFoundError(MODEL_NAME_FRAMEWORK));
            res.json(new UpdateDocumentResponse(frameworkUpdated));
        });
};

exports.framework.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_FRAMEWORK], req.loggedUser);
    Framework
        .findOneAndRemove(filterRemove, function (err, frameworkDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!frameworkDeleted) return next(new NotFoundError(MODEL_NAME_FRAMEWORK));
            res.json(new DeleteDocumentResponse(frameworkDeleted));
        });
};