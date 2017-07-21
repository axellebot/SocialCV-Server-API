"use strict";

var getOptionRemove = require("../helpers").getOptionRemove;

const Experience = require('../models/experience.schema');

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
            res.status(HTTP_STATUS_OK).json({data: experiences});
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
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Experience page. */
exports.experience = {};
exports.experience.get = function (req, res, next) {
    Experience
        .findById(req.params[PARAM_ID_EXPERIENCE])
        .exec(function (err, experience) {
            if (err) return next(new DatabaseFindError());
            if (!experience) return next(new NotFoundError(MODEL_NAME_EXPERIENCE));
            res.status(HTTP_STATUS_OK).json({data: experience});
        });
};

exports.experience.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.experience.put = function (req, res, next) {
    //TODO : Experience - Update experience
    return next(new NotImplementedError("Update details of experience "+ req.params[PARAM_ID_EXPERIENCE]));
};

exports.experience.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID_EXPERIENCE], req.decoded);
    Experience
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};