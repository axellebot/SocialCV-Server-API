"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Experience = require('../models/experience.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_EXPERIENCE;

/* Experiences page. */
exports.experiences = {};
exports.experiences.get = function (req, res, next) {
    //TODO : Experiences - Handle options
    Experience
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, experiences) {
            if (err) return next(err);
            res.json({data: experiences});
        });
};
exports.experiences.post = function (req, res, next) {
    //TODO : Experiences - Create experience
    res.status(404).send('Create a new Experience');
};
exports.experiences.put = function (req, res, next) {
    //TODO : Experiences - Add Bulk update
    res.status(404).send('Bulk update of experiences');
};
exports.experiences.delete = function (req, res, next) {
    Experience
        .remove()
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Experience page. */
exports.experience = {};
exports.experience.get = function (req, res, next) {
    Experience
        .findById(req.params[PARAM_ID])
        .exec(function (err, experience) {
            if (err) return next(err);
            res.json({data: experience});
        });
};
exports.experience.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.experience.put = function (req, res, next) {
    //TODO : Experience - Update experience
    res.status(404).send('Update details of experience');
};
exports.experience.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    Experience
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};