"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const Interest = require('../../models/interest.schema');

/* Interests page. */
exports.get = function (req, res, next) {
    //TODO : Interests - Handle options
    Interest
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, interests) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: interests});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : Interests - Create interest for user
    next(new NotImplementedError("Create a new interest for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const interests = req.body.data;
    var interestsUpdated = [];
    Async.eachOf(interests, function (interest, key, callback) {
        const filterUpdate = {
            _id: interest._id,
            user: userId
        };
        Interest
            .findOneAndUpdate(filterUpdate, interest, {new: true}, function (err, interestUpdated) {
                if (err) return callback(err);
                if (interestUpdated) interestsUpdated.push(interestUpdated);
                callback();
            });
    }, function (err) {
        if (err && interestsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && interestsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: interestsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: interestsUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    Interest
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};