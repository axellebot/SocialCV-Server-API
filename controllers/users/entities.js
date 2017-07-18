"use strict";

const Entity = require('../../models/entity.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Entities page. */
exports.get = function (req, res, next) {
    //TODO : Entities - Handle options
    Entity
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, entities) {
            if (err) return next(err);
            res.json({data: entities});
        });
};
exports.post = function (req, res, next) {
    //TODO : Entities - Create entity for user
    res.status(404).send('Create a new Entity for user : ' + req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Entities - Add Bulk update for user
    res.status(404).send('Bulk update of entities for user : ' + req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    Entity
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};