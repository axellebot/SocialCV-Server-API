"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Entity = require('../models/entity.schema');

/* Entities page. */
exports.entities = {};
exports.entities.get = function (req, res, next) {
    //TODO : Entities - Handle options
    Entity
        .find({})
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
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
    const entities = req.body.data;
    var entitiesUpdated = [];
    Async.eachOf(entities, function (entity, key, callback) {
        const filterUpdate = getFilterEditData(entity._id, req.decoded);
        Entity
            .findOneAndUpdate(filterUpdate, entity, {new: true}, function (err, entityUpdated) {
                if (err) return callback(err);
                if (entityUpdated) entitiesUpdated.push(entityUpdated);
                callback();
            });
    }, function (err) {
        if (err && entitiesUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && entitiesUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: entitiesUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: entitiesUpdated
            });
    });
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

exports.entity.put = function (req, res, next) {
    const filterUpdate = getFilterEditData(req.params[PARAM_ID_ENTITY], req.decoded);
    Entity
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, entity) {
            if (err) return next(new DatabaseUpdateError());
            if (!entity) return next(new NotFoundError(MODEL_NAME_ENTITY));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: entity});
        });
};

exports.entity.delete = function (req, res, next) {
    const filterRemove = getFilterEditData(req.params[PARAM_ID_ENTITY], req.decoded);
    Entity
        .findOneAndRemove(filterRemove, function (err, entity) {
            if (err) return next(new DatabaseRemoveError());
            if (!entity) return next(new NotFoundError(MODEL_NAME_ENTITY));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: entity});
        });
};