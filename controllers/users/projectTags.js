"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData;

const ProjectTag = require('../../models/projectTag.schema');

/* ProjectTags page. */
exports.get = function (req, res, next) {
    //TODO : ProjectTags - Handle options
    ProjectTag
        .find({user: req.params[PARAM_ID_USER]})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .sort(req.options.sort)
        .exec(function (err, projectTags) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: projectTags});
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());
    //TODO : ProjectTags - Create projectTag for user
    next(new NotImplementedError("Create a new projectTag for user : " + req.params[PARAM_ID_USER]));
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    const projectTags = req.body.data;
    var projectTagsUpdated = [];
    Async.eachOf(projectTags, function (projectTag, key, callback) {
        const filterUpdate = {
            _id: projectTag._id,
            user: userId
        };
        ProjectTag
            .findOneAndUpdate(filterUpdate, projectTag, {new: true}, function (err, projectTagUpdated) {
                if (err) return callback(err);
                if (projectTagUpdated) projectTagsUpdated.push(projectTagUpdated);
                callback();
            });
    }, function (err) {
        if (err && projectTagsUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && projectTagsUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: projectTagsUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                data: projectTagsUpdated
            });
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.decoded, userId)) return next(new MissingPrivilegeError());

    ProjectTag
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};