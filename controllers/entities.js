"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Entity = require('../models/entity.schema');

const PARAM_ID = PARAM.PARAM_ID_ENTITY;

/* Entities page. */
exports.entities = {};
exports.entities.get = function (req, res, next) {
    //TODO : Entities - Handle options
    Entity
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, entities) {
            if (err) return next(new DatabaseFindError());
            res.json({data: entities});
        });
};

exports.entities.post = function (req, res, next) {
    //TODO : Entities - Create entity
    return next(new NotImplementedError("Create a new entity"));
};

exports.entities.put = function (req, res, next) {
    //TODO : Entities - Add Bulk update
    return next(new NotImplementedError("Bulk update of entities"));
};

exports.entities.delete = function (req, res, next) {
    Entity
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Entity page. */
exports.entity = {};
exports.entity.get = function (req, res, next) {
    Entity
        .findById(req.params[PARAM_ID])
        .exec(function (err, entity) {
            if (err) return next(new DatabaseFindError());
            res.json({data: entity});
        });
};

exports.entity.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.entity.put = function (req, res, next) {
    //TODO : Entity - Update entity
    return next(new NotImplementedError("Update details of entity "+ req.params[PARAM_ID]));
};

exports.entity.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    Entity
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};