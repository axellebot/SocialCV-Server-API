"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Education = require('../models/education.schema');

/* Educations page. */
exports.educations = {};
exports.educations.get = function (req, res, next) {
    Education
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, educations) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: educations});
        });
};

exports.educations.post = function (req, res, next) {
    var education = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) education.user = req.loggedUser._id;
    education = new Education(education);

    education.save(function (err, educationSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: educationSaved
            });
    });
};

exports.educations.put = function (req, res, next) {
    const educations = req.body.data;
    var educationsUpdated = [];
    Async.eachOf(educations, function (education, key, callback) {
        const filterUpdate = getFilterEditData(education._id, req.loggedUser);
        Education
            .findOneAndUpdate(filterUpdate, education, {new: true}, function (err, educationUpdated) {
                if (err) return callback(err);
                if (educationUpdated) educationsUpdated.push(educationUpdated);
                callback();
            });
    }, function (err) {
        if (err && educationsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && educationsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: educationsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: educationsUpdated
            });
    });
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

exports.education.put = function (req, res, next) {
    const filterUpdate = getFilterEditData(req.params[PARAM_ID_EDUCATION], req.loggedUser);
    Education
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, education) {
            if (err) return next(new DatabaseUpdateError());
            if (!education) return next(new NotFoundError(MODEL_NAME_EDUCATION));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: education});
        });
};

exports.education.delete = function (req, res, next) {
    const filterRemove = getFilterEditData(req.params[PARAM_ID_EDUCATION], req.loggedUser);
    Education
        .findOneAndRemove(filterRemove, function (err, education) {
            if (err) return next(new DatabaseRemoveError());
            if (!education) return next(new NotFoundError(MODEL_NAME_EDUCATION));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: education});
        });
};