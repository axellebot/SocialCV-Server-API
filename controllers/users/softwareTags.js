"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const SoftwareTag = require('../../models/softwareTag.schema');

/* SoftwareTags page. */
exports.get = function (req, res, next) {
    //TODO : SoftwareTags - Handle options
    SoftwareTag
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwareTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: softwareTags});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID_USER])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : SoftwareTags - Create softwareTag for user
    return next(new NotImplementedError("Create a new softwareTag for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID_USER])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : SoftwareTags - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of SoftwareTags for user : " + req.params[PARAM_ID_USER]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID_USER])) {
        return next(new MissingPrivilegeError());
    }
    SoftwareTag
        .remove({user: req.params[PARAM_ID_USER]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};