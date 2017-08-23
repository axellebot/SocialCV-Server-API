"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Interest = require('../../models/interest.schema');

/* Interests page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Interest
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, interests) {
            if (err) return next(new DatabaseFindError());
            res.json(new SelectDocumentsResponse(interests));
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var interest = req.body.data;
    interest.user = userId;
    interest = new Interest(interest);

    interest.save(function (err, interestSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(interestSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const interests = req.body.data;
    var interestsUpdated = [];
    Async.eachOf(interests, function (interest, key, callback) {
        const filterUpdate = {
            _id: interest._id,
            user: userId
        };
        Interest
            .findOneAndUpdate(filterUpdate, interest, {new: true}, function (err, interestUpdated) {
                if (err) return callback(err);
                if (interestUpdated) interestsUpdated.push(interestUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(interestsUpdated));
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    Interest
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};