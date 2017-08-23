"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const OperatingSystem = require('../models/operatingSystem.schema');

/* OperatingSystems page. */
exports.operatingSystems = {};
exports.operatingSystems.get = function (req, res, next) {
    OperatingSystem
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, operatingSystems) {
            if (err) return next(new DatabaseFindError());
            res.json(new SelectDocumentsResponse(operatingSystems));
        });
};

exports.operatingSystems.post = function (req, res, next) {
    var operatingSystem = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) operatingSystem.user = req.loggedUser._id;
    operatingSystem = new OperatingSystem(operatingSystem);

    operatingSystem.save(function (err, operatingSystemSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(operatingSystemSaved));
    });
};

exports.operatingSystems.put = function (req, res, next) {
    const operatingSystems = req.body.data;
    var operatingSystemsUpdated = [];
    Async.eachOf(operatingSystems, function (operatingSystem, key, callback) {
        const filterUpdate = getFilterEditData(operatingSystem._id, req.loggedUser);
        OperatingSystem
            .findOneAndUpdate(filterUpdate, operatingSystem, {new: true}, function (err, operatingSystemUpdated) {
                if (err) return callback(err);
                if (operatingSystemUpdated) operatingSystemsUpdated.push(operatingSystemUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(operatingSystemsUpdated));
    });
};

exports.operatingSystems.delete = function (req, res, next) {
    OperatingSystem
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};

/* OperatingSystem page. */
exports.operatingSystem = {};
exports.operatingSystem.get = function (req, res, next) {
    OperatingSystem
        .findById(req.params[PARAM_ID_OPERATING_SYSTEM])
        .exec(function (err, operatingSystem) {
            if (err) return next(new DatabaseFindError());
            if (!operatingSystem) return next(new NotFoundError(MODEL_NAME_OPERATING_SYSTEM));
            res.json(new SelectDocumentResponse(operatingSystem));
        });
};

exports.operatingSystem.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_OPERATING_SYSTEM], req.loggedUser);
    OperatingSystem
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, operatingSystemUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!operatingSystemUpdated) return next(new NotFoundError(MODEL_NAME_OPERATING_SYSTEM));
            res.json(new UpdateDocumentResponse(operatingSystemUpdated));
        });
};

exports.operatingSystem.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_OPERATING_SYSTEM], req.loggedUser);
    OperatingSystem
        .findOneAndRemove(filterRemove, function (err, operatingSystemDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!operatingSystemDeleted) return next(new NotFoundError(MODEL_NAME_OPERATING_SYSTEM));
            res.json(new DeleteDocumentResponse(operatingSystemDeleted));
        });
};