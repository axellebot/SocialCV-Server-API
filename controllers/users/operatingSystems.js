"use strict";

const OperatingSystem = require('../../models/operatingSystem.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* OperatingSystems page. */
exports.get = function (req, res, next) {
    //TODO : OperatingSystems - Handle options
    OperatingSystem
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, operatingSystems) {
            if (err) return next(err);
            res.json({data: operatingSystems});
        });
};
exports.post = function (req, res, next) {
    //TODO : OperatingSystems - Create operatingSystem for user
    res.status(404).send('Create a new OperatingSystem for user : '+req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : OperatingSystems - Add Bulk update for user
    res.status(404).send('Bulk update of operatingSystems for user : '+req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    OperatingSystem
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};