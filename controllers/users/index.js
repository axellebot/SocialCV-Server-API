"use strict";

var getOptionRemove = require("../../helpers").getOptionRemove,
    userCanAccessUserData = require("../../helpers").userCanAccessUserData;

const User = require('../../models/user.schema');

/* users page. */
exports.users = {};
exports.users.get = function (req, res, next) {
    //TODO : users - Handle options
    User
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, users) {
            if (err) return next(new DatabaseFindError());
            res.status(HTTP_STATUS_OK).json({data: users});
        });
};

exports.users.post = function (req, res, next) {
    //TODO : users - Create user
    return next(new NotImplementedError("Create a new user"));
};

exports.users.put = function (req, res, next) {
    //TODO : users - Add Bulk update
    return next(new NotImplementedError("Bulk update of users"));
};

exports.users.delete = function (req, res, next) {
    User
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
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
            res.status(HTTP_STATUS_OK).json({data: user});
        });
};

exports.user.post = function (req, res, next) {
    return next(new NotFoundError());
};

exports.user.put = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID_USER])) {
        return next(new MissingPrivilegeError());
    }
    //TODO : user - Update user
    return next(new NotImplementedError("Update details of user"));
};

exports.user.delete = function (req, res, next) {
    if (!userCanAccessUserData(req.decoded, req.params[PARAM_ID_USER])) {
        return next(new MissingPrivilegeError());
    }

    var optionRemove = getOptionRemove(req.params[PARAM_ID_USER], req.decoded);

    User
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            return res.status(HTTP_STATUS_OK).json({error: false, message: `${JSON.parse(removed).n} deleted`});
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