"use strict";

var getPagination = require("../../helpers").getPagination;

const ComputingTag = require('../../models/computingTag.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* ComputingTags page. */
exports.get = function (req, res, next) {
    //TODO : ComputingTags - Handle options
    var pagination = getPagination(req);

    ComputingTag
        .find({user: req.params[PARAM_ID]})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, computingTags) {
            if (err) return next(err);
            res.json({data: computingTags});
        });
};
exports.post = function (req, res, next) {
    //TODO : ComputingTags - Create computingTag for user
    res.status(404).send('Create a new ComputingTag for user : '+req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : ComputingTags - Add Bulk update for user
    res.status(404).send('Bulk update of computingTags for user : '+req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : ComputingTags - Remove all computingTags for user
    res.status(404).send('Remove all computingTags for user : '+req.params[PARAM_ID]);
};