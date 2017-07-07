var express = require('express');
var router = express.Router();

var utils = require("../utils");

const Entity = require('../schemas/entity.schema');

/* Entities page. */
var PATH_ENTITIES = "/";
router
    .get(PATH_ENTITIES, function (req, res, next) {
        //TODO : Entities - Handle options
        var pagination = utils.getPagination(req);

        Entity
            .find({})
            .limit(pagination.limit)
            .skip(pagination.skip)
            .exec(function (err, entities) {
                if (err) return res.status(404).send(err);
                res.json({data:entities});
            });
    })
    .post(PATH_ENTITIES, function (req, res, next) {
        //TODO : Entities - Create entity
        res.status(404).send('Create a Entity');
    })
    .put(PATH_ENTITIES, function (req, res, next) {
        //TODO : Entities - Add Bulk update
        res.status(404).send('Bulk update of entities');
    })
    .delete(PATH_ENTITIES, function (req, res, next) {
        //TODO : Entities - Remove all entities
        res.status(404).send('Remove all entities');
    });

/* Entity page. */
var PATH_ENTITY = PATH_ENTITIES + ":id";
router
    .get(PATH_ENTITY, function (req, res, next) {
        Entity
            .findById(req.params.id)
            .exec(function (err, entity) {
                if (err) return res.status(404).send(err);
                res.json({data:entity});
            });
    })
    .post(PATH_ENTITY, function (req, res, next) {
        res.sendStatus(403);
    })
    .put(PATH_ENTITY, function (req, res, next) {
        //TODO : Entity - Update entity
        res.status(404).send('Bulk update of entities');
    })
    .delete(PATH_ENTITIES, function (req, res, next) {
        //TODO : Entity - Remove entity
        res.status(404).send('Remove entity');
    });

module.exports = router;