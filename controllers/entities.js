"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const Entity = require('../models/entity.schema');

/* Entities page. */
exports.entities = {};
exports.entities.get = function (req, res, next) {
    Entity
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, entities) {
            if (err) return next(new DatabaseFindError());
            Entity
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(entities, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.entities.post = function (req, res, next) {
    var entity = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) entity.user = req.loggedUser._id;
    entity = new Entity(entity);

    entity.save(function (err, entitySaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(entitySaved));
    });
};

exports.entities.put = function (req, res, next) {
    const entities = req.body.data;
    var entitiesUpdated = [];
    Async.eachOf(entities, function (entity, key, callback) {
        const filterUpdate = getFilterEditData(entity._id, req.loggedUser);
        Entity
            .findOneAndUpdate(filterUpdate, entity, {new: true}, function (err, entityUpdated) {
                if (err) return callback(err);
                if (entityUpdated) entitiesUpdated.push(entityUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(entitiesUpdated));
    });
};

exports.entities.delete = function (req, res, next) {
    Entity
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
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
            res.json(new SelectDocumentResponse(entity));
        });
};

exports.entity.put = function (req, res, next) {
    const filterUpdate = getFilterEditData(req.params[PARAM_ID_ENTITY], req.loggedUser);
    Entity
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, entityUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!entityUpdated) return next(new NotFoundError(MODEL_NAME_ENTITY));
            res.json(new UpdateDocumentResponse(entityUpdated));
        });
};

exports.entity.delete = function (req, res, next) {
    const filterRemove = getFilterEditData(req.params[PARAM_ID_ENTITY], req.loggedUser);
    Entity
        .findOneAndRemove(filterRemove, function (err, entityDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!entityDeleted) return next(new NotFoundError(MODEL_NAME_ENTITY));
            res.json(new DeleteDocumentResponse(entityDeleted));
        });
};