"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Interest = require('../../models/interest.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Interests page. */
exports.get = function (req, res, next) {
    //TODO : Interests - Handle options
    Interest
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, interests) {
            if (err) return next(new DatabaseFindError());
            res.json({data: interests});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Interests - Create interest for user
    return next(new NotImplementedError("Create a new interest for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Interests - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of interests for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    Interest
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};