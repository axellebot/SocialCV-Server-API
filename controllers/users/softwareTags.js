"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const SoftwareTag = require('../../models/softwareTag.schema');

const PARAM_ID = PARAM.PARAM_ID_USER;

/* SoftwareTags page. */
exports.get = function (req, res, next) {
    //TODO : SoftwareTags - Handle options
    SoftwareTag
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, SoftwareTags) {
            if (err) return next(new DatabaseFindError());
            res.json({data: SoftwareTags});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : SoftwareTags - Create softwareTag for user
    return next(new NotImplementedError("Create a new softwareTag for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : SoftwareTags - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of SoftwareTags for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    SoftwareTag
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};