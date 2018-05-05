"use strict";

var getFilterEditData = require("../helpers").getFilterEditData,
  getRoleRank = require("../helpers").getRoleRank,
  getPageCount = require("../helpers").getPageCount;

// Schemas
const Profile = require('../models/profile.schema');

// Errors
const DatabaseFindError = require('../errors/DatabaseFindError');
const DatabaseCountError = require('../errors/DatabaseCountError');
const DatabaseCreateError = require('../errors/DatabaseCreateError');
const DatabaseUpdateError = require('../errors/DatabaseUpdateError');
const DatabaseRemoveError = require('../errors/DatabaseRemoveError');
const NotFoundError = require('../errors/NotFoundError');

// Responses
const SelectDocumentsResponse = require('../responses/SelectDocumentsResponse');
const SelectDocumentResponse = require('../responses/SelectDocumentResponse');
const CreateDocumentResponse = require('../responses/CreateDocumentResponse');
const UpdateDocumentsResponse = require('../responses/UpdateDocumentsResponse');
const UpdateDocumentResponse = require('../responses/UpdateDocumentResponse');
const DeleteDocumentsResponse = require('../responses/DeleteDocumentsResponse');
const DeleteDocumentResponse = require('../responses/DeleteDocumentResponse');

/* Profiles page. */
exports.profiles = {};
exports.profiles.get = function(req, res, next) {
  Profile
    .find(req.queryParsed.filter)
    .select(req.queryParsed.select)
    .limit(req.queryParsed.cursor.limit)
    .skip(req.queryParsed.cursor.skip)
    .sort(req.queryParsed.cursor.sort)
    .exec(function(err, profiles) {
      if (err) return next(new DatabaseFindError());
      if (!profiles || profiles.length <= 0) return next(new NotFoundError(MODEL_NAME_PROFILE));
      Profile
        .count(req.queryParsed.filter)
        .exec(function(err, count) {
          if (err) return next(new DatabaseCountError());
          res.json(new SelectDocumentsResponse(profiles, count, getPageCount(count, req.queryParsed.cursor.limit)));
        });
    });
};

exports.profiles.post = function(req, res, next) {
  var profile = req.body.data;
  if (getRoleRank(req.loggedUser.role) < getRoleRank(ROLE_ADMIN)) profile.user = req.loggedUser._id;
  profile = new Profile(profile);

  profile.save(function(err, profileSaved) {
    if (err) return next(new DatabaseCreateError(err.message)());
    res.json(new CreateDocumentResponse(profileSaved));
  });
};

exports.profiles.put = function(req, res, next) {
  const profiles = req.body.data;
  var profilesUpdated = [];
  Async.eachOf(profiles, function(profile, key, callback) {
    const filterUpdate = getFilterEditData(profile._id, req.loggedUser);
    Profile
      .findOneAndUpdate(filterUpdate, profile, {
        new: true
      }, function(err, profileUpdated) {
        if (err) return callback(err);
        if (profileUpdated) profilesUpdated.push(profileUpdated);
        callback();
      });
  }, function(err) {
    if (err) return next(new DatabaseUpdateError());
    res.json(new UpdateDocumentsResponse(profilesUpdated));
  });
};

exports.profiles.delete = function(req, res, next) {
  Profile
    .remove()
    .exec(function(err, removed) {
      if (err) return next(new DatabaseRemoveError());
      res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
    });
};

/* Profile page. */
exports.profile = {};
exports.profile.get = function(req, res, next) {
  Profile
    .findById(req.params[PARAM_ID_PROFILE])
    .exec(function(err, profile) {
      if (err) return next(new DatabaseFindError());
      if (!profile) return next(new NotFoundError(MODEL_NAME_PROFILE));
      res.json(new SelectDocumentResponse(profile));
    });
};

exports.profile.put = function(req, res, next) {
  var filterUpdate = getFilterEditData(req.params[PARAM_ID_PROFILE], req.loggedUser);
  Profile
    .findOneAndUpdate(filterUpdate, req.body.data, {
      new: true
    }, function(err, profileUpdated) {
      if (err) return next(new DatabaseUpdateError());
      if (!profileUpdated) return next(new NotFoundError(MODEL_NAME_PROFILE));
      res.json(new UpdateDocumentResponse(profileUpdated));
    });
};

exports.profile.delete = function(req, res, next) {
  var filterRemove = getFilterEditData(req.params[PARAM_ID_PROFILE], req.loggedUser);
  Profile
    .findOneAndRemove(filterRemove, function(err, profileDeleted) {
      if (err) return next(new DatabaseRemoveError());
      if (!profileDeleted) return next(new NotFoundError(MODEL_NAME_PROFILE));
      res.json(new DeleteDocumentResponse(profileDeleted));
    });
};