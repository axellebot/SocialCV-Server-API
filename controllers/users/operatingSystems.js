"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const OperatingSystem = require('../../models/operatingSystem.schema');

const PARAM_ID = PARAM.PARAM_ID_USER;

/* OperatingSystems page. */
exports.get = function (req, res, next) {
    //TODO : OperatingSystems - Handle options
    OperatingSystem
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, operatingSystems) {
            if (err) return next(new DatabaseFindError());
            res.json({data: operatingSystems});
        });
};
exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : OperatingSystems - Create operatingSystem for user
    return next(new NotImplementedError("Create a new operatingSystem for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : OperatingSystems - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of operatingSystems for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    OperatingSystem
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};