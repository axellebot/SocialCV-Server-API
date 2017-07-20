"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Framework = require('../../models/framework.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Frameworks page. */
exports.get = function (req, res, next) {
    //TODO : Frameworks - Handle options
    Framework
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, frameworks) {
            if (err) return next(new DatabaseFindError());
            res.json({data: frameworks});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Frameworks - Create framework for user
    return next(new NotImplementedError("Create a new framework for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Frameworks - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of frameworks for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    Framework
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};