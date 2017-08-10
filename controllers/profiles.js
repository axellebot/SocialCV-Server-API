"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Profile = require('../models/profile.schema');

/* Profiles page. */
exports.profiles = {};
exports.profiles.get = function (req, res, next) {
    Profile
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, profiles) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: profiles});
        });
};

exports.profiles.post = function (req, res, next) {
    //TODO : Profiles - Create profile
    next(new NotImplementedError("Create a new profile"));
};

exports.profiles.put = function (req, res, next) {
    const profiles = req.body.data;
    var profilesUpdated = [];
    Async.eachOf(profiles, function (profile, key, callback) {
        const filterUpdate = getFilterEditData(profile._id, req.decoded);
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
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: profilesUpdated
            });
    });
};

exports.profiles.delete = function (req, res, next) {
    Profile
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Profile page. */
exports.profile = {};
exports.profile.get = function (req, res, next) {
    Profile
        .findById(req.params[PARAM_ID_PROFILE])
        .exec(function (err, profile) {
            if (err) return next(new DatabaseFindError());
            if (!profile) return next(new NotFoundError(MODEL_NAME_PROFILE));
            res.status(HTTP_STATUS_OK).json({data: profile});
        });
};

exports.profile.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROFILE], req.decoded);
    Profile
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, profile) {
            if (err) return next(new DatabaseUpdateError());
            if (!profile) return next(new NotFoundError(MODEL_NAME_PROFILE));
            return res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: profile});
        });
};

exports.profile.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_PROFILE], req.decoded);
    Profile
        .findOneAndRemove(filterRemove, function (err, profile) {
            if (err) return next(new DatabaseRemoveError());
            if (!profile) return next(new NotFoundError(MODEL_NAME_PROFILE));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: profile});
        });
};