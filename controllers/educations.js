"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
    getRoleRank = require("../helpers").getRoleRank,
    getPageCount = require("../helpers").getPageCount;

const Education = require('../models/education.schema');

/* Educations page. */
exports.educations = {};
exports.educations.get = function (req, res, next) {
    Education
        .find(req.queryParsed.filter)
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

exports.educations.post = function (req, res, next) {
    var education = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) education.user = req.loggedUser._id;
    education = new Education(education);

    education.save(function (err, educationSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(educationSaved));
    });
};

exports.educations.put = function (req, res, next) {
    const educations = req.body.data;
    var educationsUpdated = [];
    Async.eachOf(educations, function (education, key, callback) {
        const filterUpdate = getFilterEditData(education._id, req.loggedUser);
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

exports.educations.delete = function (req, res, next) {
    Education
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};

/* Education page. */
exports.education = {};
exports.education.get = function (req, res, next) {
    Education
        .findById(req.params[PARAM_ID_EDUCATION])
        .exec(function (err, education) {
            if (err) return next(new DatabaseFindError());
            if (!education) return next(new NotFoundError(MODEL_NAME_EDUCATION));
            res.json(new SelectDocumentResponse(education));
        });
};

exports.education.put = function (req, res, next) {
    const filterUpdate = getFilterEditData(req.params[PARAM_ID_EDUCATION], req.loggedUser);
    Education
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, educationUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!educationUpdated) return next(new NotFoundError(MODEL_NAME_EDUCATION));
            res.json(new UpdateDocumentResponse(educationUpdated));
        });
};

exports.education.delete = function (req, res, next) {
    const filterRemove = getFilterEditData(req.params[PARAM_ID_EDUCATION], req.loggedUser);
    Education
        .findOneAndRemove(filterRemove, function (err, educationDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!educationDeleted) return next(new NotFoundError(MODEL_NAME_EDUCATION));
            res.json(new DeleteDocumentResponse(educationDeleted));
        });
};