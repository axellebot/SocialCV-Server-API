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
            if (err) return next(new DatabaseFindError());
            res.json({data: experiences});
        });
};

exports.experiences.post = function (req, res, next) {
    //TODO : Experiences - Create experience
    return next(new NotImplementedError("Create a new experience"));
};

exports.experiences.put = function (req, res, next) {
    //TODO : Experiences - Add Bulk update
    return next(new NotImplementedError("Bulk update of experiences"));
};

exports.experiences.delete = function (req, res, next) {
    Experience
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Experience page. */
exports.experience = {};
exports.experience.get = function (req, res, next) {
    Experience
        .findById(req.params[PARAM_ID])
        .exec(function (err, experience) {
            if (err) return next(new DatabaseFindError());
            res.json({data: experience});
        });
};

exports.experience.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.experience.put = function (req, res, next) {
    //TODO : Experience - Update experience
    return next(new NotImplementedError("Update details of experience "+ req.params[PARAM_ID]));
};

exports.experience.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);
    Experience
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};