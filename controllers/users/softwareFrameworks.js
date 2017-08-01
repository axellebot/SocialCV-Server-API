"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const SoftwareFramework = require('../../models/softwareFramework.schema');

/* SoftwareFrameworks page. */
exports.get = function (req, res, next) {
    //TODO : SoftwareFrameworks - Handle options
    SoftwareFramework
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, softwareFrameworks) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: softwareFrameworks});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : SoftwareFrameworks - Create softwareFramework for user
    next(new NotImplementedError("Create a new softwareFramework for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const softwareFrameworks = req.body.data;
    var softwareFrameworksUpdated = [];
    Async.eachOf(softwareFrameworks, function (softwareFramework, key, callback) {
        const filterUpdate = {
            _id: softwareFramework._id,
            user: userId
        };
        SoftwareFramework
            .findOneAndUpdate(filterUpdate, softwareFramework, {new: true}, function (err, softwareFrameworkUpdated) {
                if (err) return callback(err);
                if (softwareFrameworkUpdated) softwareFrameworksUpdated.push(softwareFrameworkUpdated);
                callback();
            });
    }, function (err) {
        if (err && softwareFrameworksUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && softwareFrameworksUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: softwareFrameworksUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: softwareFrameworksUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    SoftwareFramework
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};