"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const ComputingTag = require('../../models/computingTag.schema');

const PARAM_ID = PARAM.PARAM_ID_USER;

/* ComputingTags page. */
exports.get = function (req, res, next) {
    //TODO : ComputingTags - Handle options
    ComputingTag
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, computingTags) {
            if (err) return next(new DatabaseFindError());
            res.json({data: computingTags});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : ComputingTags - Create computingTag for user
    return next(new NotImplementedError("Create a new computingTag for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : ComputingTags - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of computingTags for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }

    ComputingTag
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};