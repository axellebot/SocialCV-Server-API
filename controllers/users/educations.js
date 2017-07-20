"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Education = require('../../models/education.schema');

const PARAM_ID = PARAM.PARAM_ID_USER;

/* Educations page. */
exports.get = function (req, res, next) {
    //TODO : Educations - Handle options
    Education
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, educations) {
            if (err) return next(new DatabaseFindError());
            res.json({data: educations});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Educations - Create education for user
    return next(new NotImplementedError("Create a new education for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Educations - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of educations for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    Education
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};