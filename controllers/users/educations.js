"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Education = require('../../models/education.schema');

/* Educations page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Education
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, educations) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: educations});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    var education = req.body.data;
    education.user = userId;
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

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const educations = req.body.data;
    var educationsUpdated = [];
    Async.eachOf(educations, function (education, key, callback) {
        const filterUpdate = {
            _id: education._id,
            user: userId
        };
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

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    Education
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};