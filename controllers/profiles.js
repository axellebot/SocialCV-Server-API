"use strict";

// Requires packages
const Async = require('async');

// Helpers
const getFilterEditData = require("../helpers").getFilterEditData;
const getPageCount = require("../helpers").getPageCount;

// Schemas
const Profile = require('../models/profile.schema');

// Constants
const messages = require('../constants/messages');
const statuses = require('../constants/statuses');
const models = require('../constants/models');
const collections = require('../constants/collections');
const roles = require('../constants/roles');
const parameters = require('../constants/parameters');

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
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .exec(function(err, profiles) {
      if (err) return next(new DatabaseFindError());
      if (!profiles || profiles.length <= 0) return next(new NotFoundError(models.MODEL_NAME_PROFILE));
      Profile
        .count(req.query.filter)
        .exec(function(err, count) {
          if (err) return next(new DatabaseCountError());
          res.json(new SelectDocumentsResponse(profiles, count, getPageCount(count, req.query.limit)));
        });
    });
};

exports.profiles.post = function(req, res, next) {
  var profile = req.body.data;
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
    const filterUpdate = getFilterEditData(profile._id, req.user);
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
    .findById(req.params[parameters.PARAM_ID_PROFILE])
    .exec(function(err, profile) {
      if (err) return next(new DatabaseFindError());
      if (!profile) return next(new NotFoundError(models.MODEL_NAME_PROFILE));
      res.json(new SelectDocumentResponse(profile));
    });
};

exports.profile.put = function(req, res, next) {
  var filterUpdate = getFilterEditData(req.params[parameters.PARAM_ID_PROFILE], req.user);
  Profile
    .findOneAndUpdate(filterUpdate, req.body.data, {
      new: true
    }, function(err, profileUpdated) {
      if (err) return next(new DatabaseUpdateError());
      if (!profileUpdated) return next(new NotFoundError(parameters.MODEL_NAME_PROFILE));
      res.json(new UpdateDocumentResponse(profileUpdated));
    });
};

exports.profile.delete = function(req, res, next) {
  var filterRemove = getFilterEditData(req.params[parameters.PARAM_ID_PROFILE], req.user);
  Profile
    .findOneAndRemove(filterRemove, function(err, profileDeleted) {
      if (err) return next(new DatabaseRemoveError());
      if (!profileDeleted) return next(new NotFoundError(models.MODEL_NAME_PROFILE));
      res.json(new DeleteDocumentResponse(profileDeleted));
    });
};