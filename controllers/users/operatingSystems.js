"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData,
    getPageCount = require("../../helpers").getPageCount;

const OperatingSystem = require('../../models/operatingSystem.schema');

/* OperatingSystems page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    OperatingSystem
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, operatingSystems) {
            if (err) return next(new DatabaseFindError());
            OperatingSystem
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(operatingSystems, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};
exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var operatingSystem = req.body.data;
    operatingSystem.user = userId;
    operatingSystem = new OperatingSystem(operatingSystem);

    operatingSystem.save(function (err, operatingSystemSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(operatingSystemSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const operatingSystems = req.body.data;
    var operatingSystemsUpdated = [];
    Async.eachOf(operatingSystems, function (operatingSystem, key, callback) {
        const filterUpdate = {
            _id: operatingSystem._id,
            user: userId
        };
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

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    OperatingSystem
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};