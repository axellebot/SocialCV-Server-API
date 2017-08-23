"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData,
    getPageCount = require("../../helpers").getPageCount;

const Link = require('../../models/link.schema');

/* Links page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Link
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, links) {
            if (err) return next(new DatabaseFindError());
            if (!links || links.length <= 0) return next(new NotFoundError(MODEL_NAME_LINK));
            Link
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(links, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var link = req.body.data;
    link.user = userId;
    link = new Link(link);

    link.save(function (err, linkSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(linkSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const links = req.body.data;
    var linksUpdated = [];
    Async.eachOf(links, function (link, key, callback) {
        const filterUpdate = {
            _id: link._id,
            user: userId
        };
        Link
            .findOneAndUpdate(filterUpdate, link, {new: true}, function (err, linkUpdated) {
                if (err) return callback(err);
                if (linkUpdated) linksUpdated.push(linkUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(linksUpdated));
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    Link
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};