"use strict";

var getFilterEditData = require("../helpers").getFilterEditData;

const Experience = require('../models/experience.schema');

/* Experiences page. */
exports.experiences = {};
exports.experiences.get = function (req, res, next) {
    Experience
        .find(req.queryParsed.filter)
        .select(req.queryParsed.select)
        .limit(req.queryParsed.cursor.limit)
        .skip(req.queryParsed.cursor.skip)
        .sort(req.queryParsed.cursor.sort)
        .exec(function (err, experiences) {
            if (err) return next(new DatabaseFindError());
            res.json(new SelectDocumentsResponse(experiences));
        });
};

exports.experiences.post = function (req, res, next) {
    var experience = req.body.data;
    if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) experience.user = req.loggedUser._id;
    experience = new Experience(experience);

    experience.save(function (err, experienceSaved) {
        if (err) return next(new DatabaseCreateError(err.message)());
        res.json(new CreateDocumentResponse(experienceSaved));
    });
};

exports.experiences.put = function (req, res, next) {
    const experiences = req.body.data;
    var experiencesUpdated = [];
    Async.eachOf(experiences, function (experience, key, callback) {
        const filterUpdate = getFilterEditData(experience._id, req.loggedUser);
        Experience
            .findOneAndUpdate(filterUpdate, experience, {new: true}, function (err, experienceUpdated) {
                if (err) return callback(err);
                if (experienceUpdated) experiencesUpdated.push(experienceUpdated);
                callback();
            });
    }, function (err) {
        if (err) return next(new DatabaseUpdateError());
        res.json(new UpdateDocumentsResponse(experiencesUpdated));
    });
};

exports.experiences.delete = function (req, res, next) {
    Experience
        .remove()
        .exec(function (err, removed) {
            if (err) return next(new DatabaseRemoveError());
            res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
        });
};

/* Experience page. */
exports.experience = {};
exports.experience.get = function (req, res, next) {
    Experience
        .findById(req.params[PARAM_ID_EXPERIENCE])
        .exec(function (err, experience) {
            if (err) return next(new DatabaseFindError());
            if (!experience) return next(new NotFoundError(MODEL_NAME_EXPERIENCE));
            res.json(new SelectDocumentResponse(experience));
        });
};

exports.experience.put = function (req, res, next) {
    const filterUpdate = getFilterEditData(req.params[PARAM_ID_EXPERIENCE], req.loggedUser);
    Experience
        .findOneAndUpdate(filterUpdate, req.body.data, {new: true}, function (err, experienceUpdated) {
            if (err) return next(new DatabaseUpdateError());
            if (!experienceUpdated) return next(new NotFoundError(MODEL_NAME_EXPERIENCE));
            res.json(new UpdateDocumentResponse(experienceUpdated));
        });
};

exports.experience.delete = function (req, res, next) {
    const filterRemove = getFilterEditData(req.params[PARAM_ID_EXPERIENCE], req.loggedUser);
    Experience
        .findOneAndRemove(filterRemove, function (err, experienceDeleted) {
            if (err) return next(new DatabaseRemoveError());
            if (!experienceDeleted) return next(new NotFoundError(MODEL_NAME_EXPERIENCE));
            res.json(new DeleteDocumentResponse(experienceDeleted));
        });
};