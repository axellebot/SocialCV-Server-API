"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const OperatingSystem = require('../../models/operatingSystem.schema');

/* OperatingSystems page. */
exports.get = function (req, res, next) {
    var filter = req.queryParsed.filter || {};
    filter.user = req.params[PARAM_ID_USER];

    OperatingSystem
        .find(filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, operatingSystems) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: operatingSystems});
        });
};
exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : OperatingSystems - Create operatingSystem for user
    next(new NotImplementedError("Create a new operatingSystem for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const operatingSystems = req.body.data;
    var operatingSystemsUpdated = [];
    Async.eachOf(operatingSystems, function (operatingSystem, key, callback) {
        const filterUpdate = {
            _id: operatingSystem._id,
            user: userId
        };
        OperatingSystem
            .findOneAndUpdate(filterUpdate, operatingSystem, {new: true}, function (err, operatingSystemUpdated) {
                if (err) return callback(err);
                if (operatingSystemUpdated) operatingSystemsUpdated.push(operatingSystemUpdated);
                callback();
            });
    }, function (err) {
        if (err && operatingSystemsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && operatingSystemsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: operatingSystemsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: operatingSystemsUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    OperatingSystem
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};