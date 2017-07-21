"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Education = require('../models/education.schema');

/* Educations page. */
exports.educations = {};
exports.educations.get = function (req, res, next) {
    //TODO : Educations - Handle options
    Education
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, educations) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: educations});
        });
};
exports.educations.post = function (req, res, next) {
    //TODO : Educations - Create education
    next(new NotImplementedError('Create a new education'));
};

exports.educations.put = function (req, res, next) {
    //TODO : Educations - Add Bulk update
    next(new NotImplementedError('Bulk update of educations'));
};

exports.educations.delete = function (req, res, next) {
    Education
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* Education page. */
exports.education = {};
exports.education.get = function (req, res, next) {
    Education
        .findById(req.params[PARAM_ID_EDUCATION])
        .exec(function (err, education) {
            if (err) return next(new DatabaseFindError());
            if (!education) return next(new NotFoundError(MODEL_NAME_EDUCATION));
            res.status(HTTP_STATUS_OK).json({data: education});
        });
};

exports.education.post = function (req, res, next) {
    next(new NotFoundError());
};

exports.education.put = function (req, res, next) {
    var filterUpdate = getFilterEditData(req.params[PARAM_ID_EDUCATION], req.decoded);
    Education
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, education) {
            if (err) return next(new DatabaseUpdateError());
            if (!education) return next(new NotFoundError(MODEL_NAME_EDUCATION));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: education});
        });
};

exports.education.delete = function (req, res, next) {
    var filterRemove = getFilterEditData(req.params[PARAM_ID_EDUCATION], req.decoded);
    Education
        .findOneAndRemove(filterRemove, function (err, education) {
            if (err) return next(new DatabaseRemoveError());
            if (!education) return next(new NotFoundError(MODEL_NAME_EDUCATION));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: education});
        });
};