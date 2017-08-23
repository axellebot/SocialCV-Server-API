"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Profile = require('../../models/profile.schema');

/* Profiles page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Profile
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, profiles) {
            if (err) return next(new DatabaseFindError());
            res.json(new SelectDocumentsResponse(profiles));
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var profile = req.body.data;
    profile.user = userId;
    profile = new Profile(profile);

    profile.save(function (err, profileSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(profileSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const profiles = req.body.data;
    var profilesUpdated = [];
    Async.eachOf(profiles, function (profile, key, callback) {
        const filterUpdate = {
            _id: profile._id,
            user: userId
        };
        Profile
            .findOneAndUpdate(filterUpdate, profile, {new: true}, function (err, profileUpdated) {
                if (err) return callback(err);
                if (profileUpdated) profilesUpdated.push(profileUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(profilesUpdated));
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());
    Profile
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};