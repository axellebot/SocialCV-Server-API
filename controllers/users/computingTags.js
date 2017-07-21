"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const ComputingTag = require('../../models/computingTag.schema');

/* ComputingTags page. */
exports.get = function (req, res, next) {
    //TODO : ComputingTags - Handle options
    ComputingTag
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, computingTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: computingTags});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : ComputingTags - Create computingTag for user
    next(new NotImplementedError("Create a new computingTag for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : ComputingTags - Add Bulk update for user
    next(new NotImplementedError("Bulk update of computingTags for user : " + req.params[PARAM_ID_USER]));
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    ComputingTag
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};