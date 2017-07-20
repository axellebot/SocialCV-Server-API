"use strict";

var userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const Entity = require('../../models/entity.schema');

const PARAM_ID = PARAM.PARAM_ID_USER;

/* Entities page. */
exports.get = function (req, res, next) {
    //TODO : Entities - Handle options
    Entity
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, entities) {
            if (err) return next(new DatabaseFindError());
            res.json({data: entities});
        });
};

exports.post = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Entities - Create entity for user
    return next(new NotImplementedError("Create a new entity for user : " + req.params[PARAM_ID]));
};

exports.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : Entities - Add Bulk update for user
    return next(new NotImplementedError("Bulk update of entities for user : " + req.params[PARAM_ID]));
};

exports.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID])) {
        return next(new MissingPrivilegeError());
    }
    Entity
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};