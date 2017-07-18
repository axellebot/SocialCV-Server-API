"use strict";

const Language = require('../../models/language.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Languages page. */
exports.get = function (req, res, next) {
    //TODO : Languages - Handle options
    Language
        .find({user: req.params[PARAM_ID]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, languages) {
            if (err) return next(err);
            res.json({data: languages});
        });
};
exports.post = function (req, res, next) {
    //TODO : Languages - Create language for user
    res.status(404).send('Create a new Language for user : '+req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Languages - Add Bulk update for user
    res.status(404).send('Bulk update of languages for user : '+req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : Languages - Remove all languages for user
    res.status(404).send('Remove all languages for user : '+req.params[PARAM_ID]);
};