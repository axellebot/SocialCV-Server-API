"use strict";

const Profile = require('../../models/profile.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Profiles page. */
exports.get = function (req, res, next) {
    //TODO : Profiles - Handle options
    Profile
        .find({user: req.params[PARAM_ID]})
        .limit(req.pagination.limit)
        .skip(req.pagination.skip)
        .exec(function (err, profiles) {
            if (err) return next(err);
            res.json({data: profiles});
        });
};
exports.post = function (req, res, next) {
    //TODO : Profiles - Create profile for user
    res.status(404).send('Create a new Profile for user : ' + req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Profiles - Add Bulk update for user
    res.status(404).send('Bulk update of profiles for user : ' + req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : Profiles - Remove all profiles for user
    res.status(404).send('Remove all profiles for user : ' + req.params[PARAM_ID]);
};