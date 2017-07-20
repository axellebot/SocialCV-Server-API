"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const SoftwareTag = require('../models/softwareTag.schema');

const PARAM_ID = PARAM.PARAM_ID_SOFTWARE_TAG;

/* SoftwareTags page. */
exports.softwareTags = {};
exports.softwareTags.get = function (req, res, next) {
    //TODO : SoftwareTags - Handle options
    SoftwareTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, SoftwareTags) {
            if (err) return next(new DatabaseFindError());
            res.json({data: SoftwareTags});
        });
};

exports.softwareTags.post = function (req, res, next) {
    //TODO : SoftwareTags - Create softwareTag
    return next(new NotImplementedError("Create a new softwareTag"));
};

exports.softwareTags.put = function (req, res, next) {
    //TODO : SoftwareTags - Add Bulk update
    return next(new NotImplementedError("Bulk update of SoftwareTags"));
};

exports.softwareTags.delete = function (req, res, next) {
    SoftwareTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* SoftwareTag page. */
exports.softwareTag = {};
exports.softwareTag.get = function (req, res, next) {
    SoftwareTag
        .findById(req.params[PARAM_ID])
        .exec(function (err, SoftwareTag) {
            if (err) return next(new DatabaseFindError());
            res.json({data: SoftwareTag});
        });
};

exports.softwareTag.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.softwareTag.put = function (req, res, next) {
    //TODO : SoftwareTag - Update softwareTag
    return next(new NotImplementedError("Update details of softwareTag " + req.params[PARAM_ID]));
};

exports.softwareTag.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    SoftwareTag
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};