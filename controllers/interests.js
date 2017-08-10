"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Interest = require('../models/interest.schema');

/* Interests page. */
exports.interests = {};
exports.interests.get = function (req, res, next) {
    Interest
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, interests) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: interests});
        });
};

exports.interests.post = function (req, res, next) {
    //TODO : Interests - Create interest
    next(new NotImplementedError("Create a new Interest"));
};

exports.interests.put = function (req, res, next) {
    const interests = req.body.data;
    var interestsUpdated = [];
    Async.eachOf(interests, function (interest, key, callback) {
        const filterUpdate = getFilterEditData(interest._id, req.decoded);
        Interest
            .findOneAndUpdate(filterUpdate, interest, {new: true}, function (err, interestUpdated) {
                if (err) return callback(err);
                if (interestUpdated) interestsUpdated.push(interestUpdated);
                callback();
            });
    }, function (err) {
        if (err && interestsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && interestsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: interestsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: interestsUpdated
            });
    });
};

exports.interests.delete = function (req, res, next) {
    Interest
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Interest page. */
exports.interest = {};
exports.interest.get = function (req, res, next) {
    Interest
        .findById(req.params[PARAM_ID_INTEREST])
        .exec(function (err, interest) {
            if (err) return next(new DatabaseFindError());
            if (!interest) return next(new NotFoundError(MODEL_NAME_INTEREST));
            res.status(HTTP_STATUS_OK).json({data: interest});
        });
};

exports.interest.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_INTEREST], req.decoded);
    Interest
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, interest) {
            if (err) return next(new DatabaseUpdateError());
            if (!interest) return next(new NotFoundError(MODEL_NAME_INTEREST));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: interest});
        });
};

exports.interest.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_INTEREST], req.decoded);
    Interest
        .findOneAndRemove(filterRemove, function (err, interest) {
            if (err) return next(new DatabaseRemoveError());
            if (!interest) return next(new NotFoundError(MODEL_NAME_INTEREST));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: interest});
        });
};