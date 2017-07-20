"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const FrameworkTag = require('../../models/frameworkTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* FrameworkTags page. */
exports.get = function (req, res, next) {
    //TODO : FrameworkTags - Handle options
    FrameworkTag
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, FrameworkTags) {
            if (err) return next(new DatabaseFindError());
            res.json({data: FrameworkTags});
        });
};
exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : FrameworkTags - Create frameworkTag for user
    return next(new NotImplementedError("Create a new frameworkTag for user : " + req.params[PARAM_ID]));
};
exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : FrameworkTags - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of frameworkTags for user : " + req.params[PARAM_ID]));
};
exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    FrameworkTag
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};