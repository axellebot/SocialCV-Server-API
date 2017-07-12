var getPagination = require("../helpers").getPagination;

const Entity = require('../models/entity.schema');

/* Entities page. */
exports.entities = {};
exports.entities.get = function (req, res, next) {
    //TODO : Entities - Handle options
    var pagination = getPagination(req);

    Entity
        .find({})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, entities) {
            if (err) return next(err);
            res.json({data: entities});
        });
};
exports.entities.post = function (req, res, next) {
    //TODO : Entities - Create entity
    res.status(404).send('Create a Entity');
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
        .findById(req.params.id)
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
    res.status(404).send('Bulk update of entities');
};
exports.entity.delete = function (req, res, next) {
    //TODO : Entity - Remove entity
    res.status(404).send('Remove entity');
};