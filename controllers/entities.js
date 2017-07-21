"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Entity = require('../models/entity.schema');

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
            res.status(HTTP_STATUS_OK).json({data: entities});
        });
};

exports.entities.post = function (req, res, next) {
    //TODO : Entities - Create entity
    next(new NotImplementedError("Create a new entity"));
};

exports.entities.put = function (req, res, next) {
    //TODO : Entities - Add Bulk update
    next(new NotImplementedError("Bulk update of entities"));
};

exports.entities.delete = function (req, res, next) {
    Entity
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Entity page. */
exports.entity = {};
exports.entity.get = function (req, res, next) {
    Entity
        .findById(req.params[PARAM_ID_ENTITY])
        .exec(function (err, entity) {
            if (err) return next(new DatabaseFindError());
            if (!entity) return next(new NotFoundError(MODEL_NAME_ENTITY));
            res.status(HTTP_STATUS_OK).json({data: entity});
        });
};

exports.entity.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.entity.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_ENTITY], req.decoded);
    Entity
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, entity) {
            if (err) return next(new DatabaseUpdateError());
            if (!entity) return next(new NotFoundError(MODEL_NAME_ENTITY));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: entity});
        });
};

exports.entity.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_ENTITY], req.decoded);
    Entity
        .findOneAndRemove(filterRemove, function (err, entity) {
            if (err) return next(new DatabaseRemoveError());
            if (!entity) return next(new NotFoundError(MODEL_NAME_ENTITY));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: entity});
        });
};