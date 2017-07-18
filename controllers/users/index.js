"use strict";

var getOptionRemove = require("../../helpers").getOptionRemove;

const User = require('../../models/user.schema');

const PARAM_ID = global.constants.PARAM.PARAM_ID_USER;

/* users page. */
exports.users = {};
exports.users.get = function (req, res, next) {
    //TODO : users - Handle options
    User
        .find({})
        .limit(req.options.pagination.limit)
        .skip(req.options.pagination.skip)
        .exec(function (err, users) {
            if (err) return next(err);
            res.json({data: users});
        });
};
exports.users.post = function (req, res, next) {
    //TODO : users - Create user
    res.status(404).send('Create a new user');
};
exports.users.put = function (req, res, next) {
    //TODO : users - Add Bulk update
    res.status(404).send('Bulk update of users');
};
exports.users.delete = function (req, res, next) {
    User
        .remove()
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
        });
};

/* user page. */
exports.user = {};
exports.user.get = function (req, res, next) {
    User
        .findById(req.params[PARAM_ID])
        .exec(function (err, user) {
            if (err) return next(err);
            res.json({data: user});
        });
};
exports.user.post = function (req, res, next) {
    res.sendStatus(403);
};
exports.user.put = function (req, res, next) {
    //TODO : user - Update user
    res.status(404).send('Update details of user');
};
exports.user.delete = function (req, res, next) {
    var optionRemove = getOptionRemove(req.params[PARAM_ID], req.decoded);

    User
        .remove(optionRemove)
        .exec(function (err, removed) {
            if (err) return next(err);
            return res.status(200).json({error: false, message: `${JSON.parse(removed).n} deleted`});
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