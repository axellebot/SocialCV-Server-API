"use strict";

const Entity = require('../models/entity.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_ENTITY;

/* Entities page. */
exports.entities = {};
exports.entities.get = function (req, res, next) {
    //TODO : Entities - Handle options
    Entity
        .find({})
        .limit(req.pagination.limit)
        .skip(req.pagination.skip)
        .exec(function (err, entities) {
            if (err) return next(err);
            res.json({data: entities});
        });
};
exports.entities.post = function (req, res, next) {
    //TODO : Entities - Create entity
    res.status(404).send('Create a new Entity');
};
exports.entities.put = function (req, res, next) {
    //TODO : Entities - Add Bulk update
    res.status(404).send('Bulk update of entities');
};
exports.entities.delete = function (req, res, next) {
    //TODO : Entities - Remove all entities
    res.status(404).send('Remove all entities');
};

/* Entity page. */
exports.entity = {};
exports.entity.get = function (req, res, next) {
    Entity
        .findById(req.params[PARAM_ID])
        .exec(function (err, entity) {
            if (err) return next(err);
            res.json({data: entity});
        });
};
exports.entity.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.entity.put = function (req, res, next) {
    //TODO : Entity - Update entity
    res.status(404).send('Update details of entity');
};
exports.entity.delete = function (req, res, next) {
    //TODO : Entity - Remove entity
    res.status(404).send('Remove entity');
};