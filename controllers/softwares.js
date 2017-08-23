"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const Software = require('../models/software.schema');

/* Softwares page. */
exports.softwares = {};
exports.softwares.get = function (req, res, next) {
    Software
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, softwares) {
            if (err) return next(new DatabaseFindError());
            Software
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(softwares, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.softwares.post = function (req, res, next) {
    var software = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) software.user = req.loggedUser._id;
    software = new Software(software);

    software.save(function (err, softwareSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(softwareSaved));
    });
};

exports.softwares.put = function (req, res, next) {
    const softwares = req.body.data;
    var softwaresUpdated = [];
    Async.eachOf(softwares, function (software, key, callback) {
        const filterUpdate = getFilterEditData(software._id, req.loggedUser);
        Software
            .findOneAndUpdate(filterUpdate, software, {new: true}, function (err, softwareUpdated) {
                if (err) return callback(err);
                if (softwareUpdated) softwaresUpdated.push(softwareUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(softwaresUpdated));
    });
};

exports.softwares.delete = function (req, res, next) {
    Software
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};

/* Software page. */
exports.software = {};
exports.software.get = function (req, res, next) {
    Software
        .findById(req.params[PARAM_ID_SOFTWARE])
        .exec(function (err, software) {
            if (err) return next(new DatabaseFindError());
            if (!software) return next(new NotFoundError(MODEL_NAME_SOFTWARE));
            res.json(new SelectDocumentResponse(software));
        });
};

exports.software.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_SOFTWARE], req.loggedUser);
    Software
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, softwareDeleted) {
            if (err) return next(new DatabaseUpdateError());
            if (!softwareDeleted) return next(new NotFoundError(MODEL_NAME_SOFTWARE));
            res.json(new UpdateDocumentResponse(softwareDeleted));
        });
};

exports.software.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_SOFTWARE], req.loggedUser);
    Software
        .findOneAndRemove(filterRemove, function (err, softwareDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!softwareDeleted) return next(new NotFoundError(MODEL_NAME_SOFTWARE));
            res.json(new DeleteDocumentResponse(softwareDeleted));
        });
};