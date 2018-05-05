"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const Group = require('../models/group.schema');

/* Groups page. */
exports.groups = {};
exports.groups.get = function (req, res, next) {
    Group
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, groups) {
            if (err) return next(new DatabaseFindError());
            if (!groups || groups.length <= 0) return next(new NotFoundError(MODEL_NAME_PROJECT));
            Group
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(groups, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.groups.post = function (req, res, next) {
    var group = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) group.user = req.loggedUser._id;
    group = new Group(group);

    group.save(function (err, groupSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(groupSaved));
    });
};

exports.groups.put = function (req, res, next) {
    const groups = req.body.data;
    var groupsUpdated = [];
    Async.eachOf(groups, function (group, key, callback) {
        const filterUpdate = getFilterEditData(group._id, req.loggedUser);
        Group
            .findOneAndUpdate(filterUpdate, group, {new: true}, function (err, groupUpdated) {
                if (err) return callback(err);
                if (groupUpdated) groupsUpdated.push(groupUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(groupsUpdated));
    });
};

exports.groups.delete = function (req, res, next) {
    Group
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};

/* Group page. */
exports.group = {};
exports.group.get = function (req, res, next) {
    Group
        .findById(req.params[PARAM_ID_PROJECT])
        .exec(function (err, group) {
            if (err) return next(new DatabaseFindError());
            if (!group) return next(new NotFoundError(MODEL_NAME_PROJECT));
            res.json(new SelectDocumentResponse(group));
        });
};

exports.group.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROJECT], req.loggedUser);
    Group
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, groupUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!groupUpdated) return next(new NotFoundError(MODEL_NAME_PROJECT));
            res.json(new UpdateDocumentResponse(groupUpdated));
        });
};

exports.group.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_PROJECT], req.loggedUser);
    Group
        .findOneAndRemove(filterRemove, function (err, groupDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!groupDeleted) return next(new NotFoundError(MODEL_NAME_PROJECT));
            res.json(new DeleteDocumentResponse(groupDeleted));
        });
};