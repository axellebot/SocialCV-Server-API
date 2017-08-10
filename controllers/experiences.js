"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Experience = require('../models/experience.schema');

/* Experiences page. */
exports.experiences = {};
exports.experiences.get = function (req, res, next) {
    Experience
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, experiences) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: experiences});
        });
};

exports.experiences.post = function (req, res, next) {
    //TODO : Experiences - Create experience
    next(new NotImplementedError("Create a new experience"));
};

exports.experiences.put = function (req, res, next) {
    const experiences = req.body.data;
    var experiencesUpdated = [];
    Async.eachOf(experiences, function (experience, key, callback) {
        const filterUpdate = getFilterEditData(experience._id, req.decoded);
        Experience
            .findOneAndUpdate(filterUpdate, experience, {new: true}, function (err, experienceUpdated) {
                if (err) return callback(err);
                if (experienceUpdated) experiencesUpdated.push(experienceUpdated);
                callback();
            });
    }, function (err) {
        if (err && experiencesUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && experiencesUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: experiencesUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: experiencesUpdated
            });
    });
};

exports.experiences.delete = function (req, res, next) {
    Experience
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
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

exports.experience.put = function (req, res, next) {
    const filterUpdate = getFilterEditData(req.params[PARAM_ID_EXPERIENCE], req.decoded);
    Experience
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, experience) {
            if (err) return next(new DatabaseUpdateError());
            if (!experience) return next(new NotFoundError(MODEL_NAME_EXPERIENCE));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: experience});
        });
};

exports.experience.delete = function (req, res, next) {
    const filterRemove = getFilterEditData(req.params[PARAM_ID_EXPERIENCE], req.decoded);
    Experience
        .findOneAndRemove(filterRemove, function (err, experience) {
            if (err) return next(new DatabaseRemoveError());
            if (!experience) return next(new NotFoundError(MODEL_NAME_EXPERIENCE));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: experience});
        });
};