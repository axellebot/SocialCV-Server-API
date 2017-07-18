"use strict";

const Software = require('../../models/software.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Softwares page. */
exports.get = function (req, res, next) {
    //TODO : Softwares - Handle options
    Software
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwares) {
            if (err) return next(err);
            res.json({data: softwares});
        });
};
exports.post = function (req, res, next) {
    //TODO : Softwares - Create software for user
    res.status(404).send('Create a new Software for user : ' + req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Softwares - Add Bulk update for user
    res.status(404).send('Bulk update of softwares for user : ' + req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    Software
        .remove({user: req.params[PARAM_ID]})
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};