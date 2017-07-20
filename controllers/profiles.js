"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Profile = require('../models/profile.schema');

const PARAM_ID = PARAM.PARAM_ID_PROFILE;

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
            res.json({data: profiles});
        });
};

exports.profiles.post = function (req, res, next) {
    //TODO : Profiles - Create profile
    return next(new NotImplementedError("Create a new profile"));
};

exports.profiles.put = function (req, res, next) {
    //TODO : Profiles - Add Bulk update
    return next(new NotImplementedError("Bulk update of profiles"));
};

exports.profiles.delete = function (req, res, next) {
    Profile
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Profile page. */
exports.profile = {};
exports.profile.get = function (req, res, next) {
    Profile
        .findById(req.params[PARAM_ID])
        .exec(function (err, profile) {
            if (err) return next(new DatabaseFindError());
            res.json({data: profile});
        });
};

exports.profile.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.profile.put = function (req, res, next) {
    //TODO : Profile - Update profile
    return next(new NotImplementedError("Update details of profile " + req.params[PARAM_ID]));
};

exports.profile.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    Profile
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};