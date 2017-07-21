"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

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
    return next(new NotImplementedError("Create a new Interest"));
};

exports.interests.put = function (req, res, next) {
    //TODO : Interests - Add Bulk update
    return next(new NotImplementedError("Bulk update of interests"));
};

exports.interests.delete = function (req, res, next) {
    Interest
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Interest page. */
exports.interest = {};
exports.interest.get = function (req, res, next) {
    Interest
        .findById(req.params[PARAM_ID_INTEREST])
        .exec(function (err, interest) {
            if (err) return next(new DatabaseFindError());
            if (!interest) return next(new NotFoundError("Interest not found."));
            res.status(HTTP_STATUS_OK).json({data: interest});
        });
};

exports.interest.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.interest.put = function (req, res, next) {
    //TODO : Interest - Update interest
    return next(new NotImplementedError("Update details of interest " + req.params[PARAM_ID_INTEREST]));
};

exports.interest.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_INTEREST], req.decoded);
    Interest
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};