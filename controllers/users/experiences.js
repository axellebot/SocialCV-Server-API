"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Experience = require('../../models/experience.schema');

/* Experiences page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Experience
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, experiences) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: experiences});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    var experience = req.body.data;
    experience.user = userId;
    experience = new Experience(experience);

    experience.save(function (err, experienceSaved) {
        if (err) return next(new DatabaseCreateError());
        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_CREATED,
                data: experienceSaved
            });
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const experiences = req.body.data;
    var experiencesUpdated = [];
    Async.eachOf(experiences, function (experience, key, callback) {
        const filterUpdate = {
            _id: experience._id,
            user: userId
        };
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
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: experiencesUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    Experience
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};