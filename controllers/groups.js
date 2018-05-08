"use strict";

// Requires packages
const Async = require('async');

// Helpers
const getFilterEditData = require("../helpers").getFilterEditData;
const getPageCount = require("../helpers").getPageCount;

// Schemas
const Group = require('../models/group.schema');

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

/* Groups page. */
exports.groups = {};
exports.groups.get = function(req, res, next) {
  Group
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .exec(function(err, groups) {
      if (err) return next(new DatabaseFindError());
      if (!groups || groups.length <= 0) return next(new NotFoundError(models.MODEL_NAME_PROJECT));
      Group
        .count(req.query.filter)
        .exec(function(err, count) {
          if (err) return next(new DatabaseCountError());
          res.json(new SelectDocumentsResponse(groups, count, getPageCount(count, req.query.limit)));
        });
    });
};

exports.groups.post = function(req, res, next) {
  var group = req.body.data;
  group = new Group(group);

  group.save(function(err, groupSaved) {
    if (err) return next(new DatabaseCreateError(err.message)());
    res.json(new CreateDocumentResponse(groupSaved));
  });
};

exports.groups.put = function(req, res, next) {
  const groups = req.body.data;
  var groupsUpdated = [];
  Async.eachOf(groups, function(group, key, callback) {
    const filterUpdate = getFilterEditData(group._id, req.user);
    Group
      .findOneAndUpdate(filterUpdate, group, {
        new: true
      }, function(err, groupUpdated) {
        if (err) return callback(err);
        if (groupUpdated) groupsUpdated.push(groupUpdated);
        callback();
      });
  }, function(err) {
    if (err) return next(new DatabaseUpdateError());
    res.json(new UpdateDocumentsResponse(groupsUpdated));
  });
};

exports.groups.delete = function(req, res, next) {
  Group
    .remove()
    .exec(function(err, removed) {
      if (err) return next(new DatabaseRemoveError());
      res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
    });
};

/* Group page. */
exports.group = {};
exports.group.get = function(req, res, next) {
  Group
    .findById(req.params[parameters.PARAM_ID_PROJECT])
    .exec(function(err, group) {
      if (err) return next(new DatabaseFindError());
      if (!group) return next(new NotFoundError(models.MODEL_NAME_PROJECT));
      res.json(new SelectDocumentResponse(group));
    });
};

exports.group.put = function(req, res, next) {
  var filterUpdate = getFilterEditData(req.params[parameters.PARAM_ID_PROJECT], req.user);
  Group
    .findOneAndUpdate(filterUpdate, req.body.data, {
      new: true
    }, function(err, groupUpdated) {
      if (err) return next(new DatabaseUpdateError());
      if (!groupUpdated) return next(new NotFoundError(models.MODEL_NAME_PROJECT));
      res.json(new UpdateDocumentResponse(groupUpdated));
    });
};

exports.group.delete = function(req, res, next) {
  var filterRemove = getFilterEditData(req.params[parameters.PARAM_ID_PROJECT], req.user);
  Group
    .findOneAndRemove(filterRemove, function(err, groupDeleted) {
      if (err) return next(new DatabaseRemoveError());
      if (!groupDeleted) return next(new NotFoundError(models.MODEL_NAME_PROJECT));
      res.json(new DeleteDocumentResponse(groupDeleted));
    });
};