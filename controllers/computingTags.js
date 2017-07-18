"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const ComputingTag = require('../models/computingTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_COMPUTING_TAG;

/* ComputingTags page. */
exports.computingTags = {};
exports.computingTags.get = function (req, res, next) {
    //TODO : ComputingTags - Handle options
    ComputingTag
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, computingTags) {
            if (err) return next(err);
            res.json({data: computingTags});
        });
};
exports.computingTags.post = function (req, res, next) {
    //TODO : ComputingTags - Create computingTag
    res.status(404).send('Create a new ComputingTag');
};
exports.computingTags.put = function (req, res, next) {
    //TODO : ComputingTags - Add Bulk update
    res.status(404).send('Bulk update of computingTags');
};
exports.computingTags.delete = function (req, res, next) {
    ComputingTag
        .remove()
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* ComputingTag page. */
exports.computingTag = {};
exports.computingTag.get = function (req, res, next) {
    ComputingTag
        .findById(req.params[PARAM_ID])
        .exec(function (err, computingTag) {
            if (err) return next(err);
            res.json({data: computingTag});
        });
};
exports.computingTag.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.computingTag.put = function (req, res, next) {
    //TODO : ComputingTag - Update computingTag
    res.status(404).send('Update details of computingTag');
};
exports.computingTag.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    ComputingTag
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};