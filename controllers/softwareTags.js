"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const SoftwareTag = require('../models/softwareTag.schema');

/* SoftwareTags page. */
exports.softwareTags = {};
exports.softwareTags.get = function (req, res, next) {
    //TODO : SoftwareTags - Handle options
    SoftwareTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwareTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: softwareTags});
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
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* SoftwareTag page. */
exports.softwareTag = {};
exports.softwareTag.get = function (req, res, next) {
    SoftwareTag
        .findById(req.params[PARAM_ID_SOFTWARE_TAG])
        .exec(function (err, softwareTag) {
            if (err) return next(new DatabaseFindError());
            if (!softwareTag) return next(new NotFoundError(MODEL_NAME_FRAMEWORK_TAG));
            res.status(HTTP_STATUS_OK).json({data: softwareTag});
        });
};

exports.softwareTag.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.softwareTag.put = function (req, res, next) {
    //TODO : SoftwareTag - Update softwareTag
    return next(new NotImplementedError("Update details of softwareTag " + req.params[PARAM_ID_SOFTWARE_TAG]));
};

exports.softwareTag.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_SOFTWARE_TAG], req.decoded);
    SoftwareTag
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};