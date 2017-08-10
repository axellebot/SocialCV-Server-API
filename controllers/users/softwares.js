"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Software = require('../../models/software.schema');

/* Softwares page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    Software
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, softwares) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: softwares});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Softwares - Create software for user
    next(new NotImplementedError("Create a new software for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const softwares = req.body.data;
    var softwaresUpdated = [];
    Async.eachOf(softwares, function (software, key, callback) {
        const filterUpdate = {
            _id: software._id,
            user: userId
        };
        Software
            .findOneAndUpdate(filterUpdate, software, {new: true}, function (err, softwareUpdated) {
                if (err) return callback(err);
                if (softwareUpdated) softwaresUpdated.push(softwareUpdated);
                callback();
            });
    }, function (err) {
        if (err && softwaresUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && softwaresUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: softwaresUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: softwaresUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    Software
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};