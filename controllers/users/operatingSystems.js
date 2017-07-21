"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const OperatingSystem = require('../../models/operatingSystem.schema');

/* OperatingSystems page. */
exports.get = function (req, res, next) {
    //TODO : OperatingSystems - Handle options
    OperatingSystem
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, operatingSystems) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: operatingSystems});
        });
};
exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : OperatingSystems - Create operatingSystem for user
    return next(new NotImplementedError("Create a new operatingSystem for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : OperatingSystems - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of operatingSystems for user : " + req.params[PARAM_ID_USER]));
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    OperatingSystem
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};