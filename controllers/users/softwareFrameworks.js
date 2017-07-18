"use strict";

const SoftwareFramework = require('../../models/softwareFramework.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* SoftwareFrameworks page. */
exports.get = function (req, res, next) {
    //TODO : SoftwareFrameworks - Handle options
    SoftwareFramework
        .find({user: req.params[PARAM_ID]})
        .limit(req.pagination.limit)
        .skip(req.pagination.skip)
        .exec(function (err, softwareFrameworks) {
            if (err) return next(err);
            res.json({data: softwareFrameworks});
        });
};
exports.post = function (req, res, next) {
    //TODO : SoftwareFrameworks - Create softwareFramework for user
    res.status(404).send('Create a new SoftwareFramework for user : ' + req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : SoftwareFrameworks - Add Bulk update for user
    res.status(404).send('Bulk update of softwareFrameworks for user : ' + req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : SoftwareFrameworks - Remove all softwareFrameworks for user
    res.status(404).send('Remove all softwareFrameworks for user : ' + req.params[PARAM_ID]);
};