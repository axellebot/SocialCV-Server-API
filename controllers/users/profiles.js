"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Profile = require('../../models/profile.schema');

const PARAM_ID = PARAM.PARAM_ID_USER;

/* Profiles page. */
exports.get = function (req, res, next) {
    //TODO : Profiles - Handle options
    Profile
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, profiles) {
            if (err) return next(new DatabaseFindError());
            res.json({data: profiles});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Profiles - Create profile for user
    return next(new NotImplementedError("Create a new profile for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Profiles - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of profiles for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    Profile
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};