"use strict";

var getPagination = require("../../helpers").getPagination;

const Interest = require('../../models/interest.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Interests page. */
exports.get = function (req, res, next) {
    //TODO : Interests - Handle options
    var pagination = getPagination(req);
    Interest
        .find({user: req.params[PARAM_ID]})
        .limit(pagination.limit)
        .skip(pagination.skip)
        .exec(function (err, interests) {
            if (err) return next(err);
            res.json({data: interests});
        });
};
exports.post = function (req, res, next) {
    //TODO : Interests - Create interest for user
    res.status(404).send('Create a new Interest for user : '+req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Interests - Add Bulk update for user
    res.status(404).send('Bulk update of interests for user : '+req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : Interests - Remove all interests for user
    res.status(404).send('Remove all interests for user : '+req.params[PARAM_ID]);
};