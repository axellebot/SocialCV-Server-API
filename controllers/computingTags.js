"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const ComputingTag = require('../models/computingTag.schema');

/* ComputingTags page. */
exports.computingTags = {};
exports.computingTags.get = function (req, res, next) {
    //TODO : ComputingTags - Handle options
    ComputingTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, computingTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: computingTags});
        });
};
exports.computingTags.post = function (req, res, next) {
    //TODO : ComputingTags - Create computingTag
    return next(new NotImplementedError("Create a new computingTag"));
};
exports.computingTags.put = function (req, res, next) {
    //TODO : ComputingTags - Add Bulk update
    return next(new NotImplementedError("Bulk update of computingTags"));
};
exports.computingTags.delete = function (req, res, next) {
    ComputingTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* ComputingTag page. */
exports.computingTag = {};
exports.computingTag.get = function (req, res, next) {
    ComputingTag
        .findById(req.params[PARAM_ID_COMPUTING_TAG])
        .exec(function (err, computingTag) {
            if (err) return next(new DatabaseFindError());
            if (!computingTag) return next(new NotFoundError("ComputingTag not found."));
            res.status(HTTP_STATUS_OK).json({data: computingTag});
        });
};

exports.computingTag.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.computingTag.put = function (req, res, next) {
    //TODO : ComputingTag - Update computingTag
    return next(new NotImplementedError("Update details of computingTag " + req.params[PARAM_ID_COMPUTING_TAG]));
};

exports.computingTag.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_COMPUTING_TAG], req.decoded);
    ComputingTag
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};