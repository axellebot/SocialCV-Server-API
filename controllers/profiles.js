"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Profile = require('../models/profile.schema');

/* Profiles page. */
exports.profiles = {};
exports.profiles.get = function (req, res, next) {
    //TODO : Profiles - Handle options
    Profile
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
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
    //TODO : Profiles - Add Bulk update
    next(new NotImplementedError("Bulk update of profiles"));
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

exports.profile.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.profile.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROFILE], req.decoded);
    Profile
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true},function (err, profile) {
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