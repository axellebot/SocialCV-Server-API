"use strict";

const Experience = require('../../models/experience.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* Experiences page. */
exports.get = function (req, res, next) {
    //TODO : Experiences - Handle options
    Experience
        .find({user: req.params[PARAM_ID]})
        .limit(req.pagination.limit)
        .skip(req.pagination.skip)
        .exec(function (err, experiences) {
            if (err) return next(err);
            res.json({data: experiences});
        });
};
exports.post = function (req, res, next) {
    //TODO : Experiences - Create experience for user
    res.status(404).send('Create a new Experience for user : '+req.params[PARAM_ID]);
};
exports.put = function (req, res, next) {
    //TODO : Experiences - Add Bulk update for user
    res.status(404).send('Bulk update of experiences for user : '+req.params[PARAM_ID]);
};
exports.delete = function (req, res, next) {
    //TODO : Experiences - Remove all experiences for user
    res.status(404).send('Remove all experiences for user : '+req.params[PARAM_ID]);
};