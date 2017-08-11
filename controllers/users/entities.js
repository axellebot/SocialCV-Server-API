"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Entity = require('../../models/entity.schema');

/* Entities page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Entity
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, entities) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: entities});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var entity = req.body.data;
    entity.user = userId;
    entity = new Entity(entity);

    entity.save(function (err, entitySaved) {
        if (err) return next(new DatabaseCreateError(err.message));
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: entitySaved
            });
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    const entities = req.body.data;
    var entitiesUpdated = [];
    Async.eachOf(entities, function (entity, key, callback) {
        const filterUpdate = {
            _id: entity._id,
            user: userId
        };
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
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: entitiesUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    Entity
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};