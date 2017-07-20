"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Experience = require('../../models/experience.schema');

const PARAM_ID = PARAM.PARAM_ID_USER;

/* Experiences page. */
exports.get = function (req, res, next) {
    //TODO : Experiences - Handle options
    Experience
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, experiences) {
            if (err) return next(new DatabaseFindError());
            res.json({data: experiences});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Experiences - Create experience for user
    return next(new NotImplementedError("Create a new experience for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Experiences - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of experiences for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    Experience
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};