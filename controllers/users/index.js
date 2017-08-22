"use strict";

var getFilterEditData = require("../../helpers").getFilterEditData,
    userCanEditUserData = require("../../helpers").userCanEditUserData,
    getUserPublicInfo = require("../../helpers").getUserPublicInfo;

const User = require('../../models/user.schema');

/* users page. */
exports.users = {};
exports.users.get = function (req, res, next) {
    User
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, users) {
            if (err) return next(new DatabaseFindError());
            //Remove secret data from users
            users.forEach(function (item, index) {
                users[index] = getUserPublicInfo(item);
            });
            res.status(HTTP_STATUS_OK).json({data: users});
        });
};

exports.users.post = function (req, res, next) {
    //TODO : users - Create user
    next(new NotImplementedError("Create a new user"));
};

exports.users.put = function (req, res, next) {
    const users = req.body.data;
    var usersUpdated = [];
    Async.eachOf(users, function (user, key, callback) {
        if (!userCanEditUserData(req.loggedUser, user._id)) return next(new MissingPrivilegeError());

        const filterUpdate = {_id: user._id};
        User
            .findOneAndUpdate(filterUpdate, user, {new: true}, function (err, computingTagUpdated) {
                if (err) return callback(err);
                if (computingTagUpdated) usersUpdated.push(computingTagUpdated);
                callback();
            });
    }, function (err) {
        if (err && usersUpdated.length === 0) return next(new DatabaseUpdateError());
        if (err && usersUpdated.length > 0) {
            return res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({
                    error: true,
                    message: MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE,
                    data: usersUpdated
                });
        }

        res
            .status(HTTP_STATUS_OK)
            .json({
                message: MESSAGE_SUCCESS_RESOURCE_UPDATED,
                data: usersUpdated
            });
    });
};

exports.users.delete = function (req, res, next) {
    User
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* user page. */
exports.user = {};
exports.user.get = function (req, res, next) {
    User
        .findById(req.params[PARAM_ID_USER])
        .exec(function (err, user) {
            if (err) return next(new DatabaseFindError());
            if (!user) return next(new NotFoundError(MODEL_NAME_USER));
            res.status(HTTP_STATUS_OK).json({data: getUserPublicInfo(user)});
        });
};

exports.user.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    User
        .findOneAndUpdate({_id: userId}, req.body.data, {returnNewDocument: true}, function (err, user) {
            if (err) return next(new DatabaseUpdateError());
            if (!user) return next(new NotFoundError(MODEL_NAME_USER));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_UPDATED, data: user});
        });
};

exports.user.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    User
        .findOneAndRemove({_id: userId}, function (err, user) {
            if (err) return next(new DatabaseRemoveError());
            if (!user) return next(new NotFoundError(MODEL_NAME_USER));
            res.status(HTTP_STATUS_OK).json({message: MESSAGE_SUCCESS_RESOURCE_DELETED, data: user});
        });
};

exports.user.computingTags = require('./computingTags');
exports.user.educations = require('./educations');
exports.user.entities = require('./entities');
exports.user.experiences = require('./experiences');
exports.user.frameworks = require('./frameworks');
exports.user.frameworkTags = require('./frameworkTags');
exports.user.interests = require('./interests');
exports.user.languages = require('./languages');
exports.user.links = require('./links');
exports.user.linkTags = require('./linkTags');
exports.user.operatingSystems = require('./operatingSystems');
exports.user.profiles = require('./profiles');
exports.user.programmingLanguages = require('./programmingLanguages');
exports.user.projects = require('./projects');
exports.user.projectTags = require('./projectTags');
exports.user.softwareFrameworks = require('./softwareFrameworks');
exports.user.softwares = require('./softwares');
exports.user.softwareTags = require('./softwareTags');