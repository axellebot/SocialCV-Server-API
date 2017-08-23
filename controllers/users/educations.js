"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData,
    getPageCount = require("../../helpers").getPageCount;

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
            if (!educations || educations.length <= 0) return next(new NotFoundError(MODEL_NAME_EDUCATION));
            Education
                .count(req.queryParsed.filter)
                .exec(function (err, count) {
                    if (err) return next(new DatabaseCountError());
                    res.json(new SelectDocumentsResponse(educations, count, getPageCount(count, req.queryParsed.cursor.limit)));
                });
        });
};

exports.post = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    var education = req.body.data;
    education.user = userId;
    education = new Education(education);

    education.save(function (err, educationSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(educationSaved));
    });
};

exports.put = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

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
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(educationsUpdated));
    });
};

exports.delete = function (req, res, next) {
    const userId = req.params[PARAM_ID_USER];
    if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

    Education
        .remove({user: userId})
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};