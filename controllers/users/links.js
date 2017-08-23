"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

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
            res.json(new SelectDocumentsResponse(links));
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