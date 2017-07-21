"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Link = require('../../models/link.schema');

/* Links page. */
exports.get = function (req, res, next) {
    //TODO : Links - Handle options
    Link
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, links) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: links});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Links - Create link for user
    next(new NotImplementedError("Create a new link for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Links - Add Bulk update for user
    next(new NotImplementedError("Bulk update of links for user : " + req.params[PARAM_ID_USER]));
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanAccessUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    Link
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};