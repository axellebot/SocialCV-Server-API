"use strict";

const SoftwareFramework = require('../../models/softwareFramework.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* SoftwareFrameworks page. */
exports.get = function (req, res, next) {
    //TODO : SoftwareFrameworks - Handle options
    SoftwareFramework
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
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
    SoftwareFramework
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};