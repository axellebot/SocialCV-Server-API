"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Software = require('../../models/software.schema');

const PARAM_ID = PARAM.PARAM_ID_USER;

/* Softwares page. */
exports.get = function (req, res, next) {
    //TODO : Softwares - Handle options
    Software
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwares) {
            if (err) return next(new DatabaseFindError());
            res.json({data: softwares});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Softwares - Create software for user
    return next(new NotImplementedError("Create a new software for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Softwares - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of softwares for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    Software
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};