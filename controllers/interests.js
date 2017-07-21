"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Interest = require('../models/interest.schema');

/* Interests page. */
exports.interests = {};
exports.interests.get = function (req, res, next) {
    //TODO : Interests - Handle options
    Interest
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
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
    //TODO : Interests - Add Bulk update
    next(new NotImplementedError("Bulk update of interests"));
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

exports.interest.post = function (req, res, next) {
    next(new NotFoundError());
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