"use strict";

const Profile = require('../models/profile.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_PROFILE;

/* Profiles page. */
exports.profiles = {};
exports.profiles.get = function (req, res, next) {
    //TODO : Profiles - Handle options
    Profile
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, profiles) {
            if (err) return next(err);
            res.json({data: profiles});
        });
};
exports.profiles.post = function (req, res, next) {
    //TODO : Profiles - Create profile
    res.status(404).send('Create a new Profile');
};
exports.profiles.put = function (req, res, next) {
    //TODO : Profiles - Add Bulk update
    res.status(404).send('Bulk update of profiles');
};
exports.profiles.delete = function (req, res, next) {
    //TODO : Profiles - Remove all profiles
    res.status(404).send('Remove all profiles');
};

/* Profile page. */
exports.profile = {};
exports.profile.get = function (req, res, next) {
    Profile
        .findById(req.params[PARAM_ID])
        .exec(function (err, profile) {
            if (err) return next(err);
            res.json({data: profile});
        });
};
exports.profile.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.profile.put = function (req, res, next) {
    //TODO : Profile - Update profile
    res.status(404).send('Update details of profiles');
};
exports.profile.delete = function (req, res, next) {
    //TODO : Profile - Remove profile
    res.status(404).send('Remove profile');
};