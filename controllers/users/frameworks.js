"use strict";

const Framework = require('../../models/framework.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Frameworks page. */
exports.get = function (req, res, next) {
    //TODO : Frameworks - Handle options
    Framework
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, frameworks) {
            if (err) return next(err);
            res.json({data: frameworks});
        });
};
exports.post = function (req, res, next) {
    //TODO : Frameworks - Create framework for user
    res.status(404).send('Create a new Framework for user : '+req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Frameworks - Add Bulk update for user
    res.status(404).send('Bulk update of frameworks for user : '+req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    Framework
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};