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
            res.status(HTTP_STATUS_OK).json({data: profiles});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Profiles - Create profile for user
    next(new NotImplementedError("Create a new profile for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

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
        if (err && profilesUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && profilesUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: profilesUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: profilesUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    Profile
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};