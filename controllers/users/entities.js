"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Entity = require('../../models/entity.schema');

/* Entities page. */
exports.get = function (req, res, next) {
    //TODO : Entities - Handle options
    Entity
        .find({user: req.params[PARAM_ID_USER]})
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
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Entities - Create entity for user
    next(new NotImplementedError("Create a new entity for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

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
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: entitiesUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    Entity
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};