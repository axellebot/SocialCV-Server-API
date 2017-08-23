"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Software = require('../../models/software.schema');

/* Softwares page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Software
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, softwares) {
            if (err) return next(new DatabaseFindError());
            res.json(new SelectDocumentsResponse(softwares));
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var software = req.body.data;
    software.user = userId;
    software = new Software(software);

    software.save(function (err, softwareSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(softwareSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const softwares = req.body.data;
    var softwaresUpdated = [];
    Async.eachOf(softwares, function (software, key, callback) {
        const filterUpdate = {
            _id: software._id,
            user: userId
        };
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

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    Software
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};