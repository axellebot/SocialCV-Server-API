"use strict";

// Requires packages
const Async = require('async');

// Helpers
const getFilterEditData = require("../helpers").getFilterEditData;
const getPageCount = require("../helpers").getPageCount;

// Schemas
const Entry = require('../models/entry.schema');

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

/* Entrys page. */
exports.entries = {};
exports.entries.get = function(req, res, next) {
  Entry
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .exec(function(err, entries) {
      if (err) return next(new DatabaseFindError());
      if (!entries || entries.length <= 0) return next(new NotFoundError(models.MODEL_NAME_LANGUAGE));
      Entry
        .count(req.query.filter)
        .exec(function(err, count) {
          if (err) return next(new DatabaseCountError());
          res.json(new SelectDocumentsResponse(entries, count, getPageCount(count, req.query.limit)));
        });
    });
};

exports.entries.post = function(req, res, next) {
  var entry = req.body.data;
  entry = new Entry(entry);

  entry.save(function(err, entrySaved) {
    if (err) return next(new DatabaseCreateError(err.message)());
    res.json(new CreateDocumentResponse(entrySaved));
  });
};

exports.entries.put = function(req, res, next) {
  const entries = req.body.data;
  var entriesUpdated = [];
  Async.eachOf(entries, function(entry, key, callback) {
    const filterUpdate = getFilterEditData(entry._id, req.user);
    Entry
      .findOneAndUpdate(filterUpdate, entry, {
        new: true
      }, function(err, entryUpdated) {
        if (err) return callback(err);
        if (entryUpdated) entriesUpdated.push(entryUpdated);
        callback();
      });
  }, function(err) {
    if (err) return next(new DatabaseUpdateError());
    res.json(new UpdateDocumentsResponse(entriesUpdated));
  });
};

exports.entries.delete = function(req, res, next) {
  Entry
    .remove()
    .exec(function(err, removed) {
      if (err) return next(new DatabaseRemoveError());
      res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
    });
};

/* Entry page. */
exports.entry = {};
exports.entry.get = function(req, res, next) {
  Entry
    .findById(req.params[parameters.PARAM_ID_LANGUAGE])
    .exec(function(err, entry) {
      if (err) return next(new DatabaseFindError());
      if (!entry) return next(new NotFoundError(models.MODEL_NAME_LANGUAGE));
      res.json(new SelectDocumentResponse(entry));
    });
};

exports.entry.put = function(req, res, next) {
  var filterUpdate = getFilterEditData(req.params[parameters.PARAM_ID_LANGUAGE], req.user);
  Entry
    .findOneAndUpdate(filterUpdate, req.body.data, {
      new: true
    }, function(err, entryUpdated) {
      if (err) return next(new DatabaseUpdateError());
      if (!entryUpdated) return next(new NotFoundError(models.MODEL_NAME_LANGUAGE));
      res.json(new UpdateDocumentResponse(entryUpdated));
    });
};

exports.entry.delete = function(req, res, next) {
  var filterRemove = getFilterEditData(req.params[parameters.PARAM_ID_LANGUAGE], req.user);
  Entry
    .findOneAndRemove(filterRemove, function(err, entryDeleted) {
      if (err) return next(new DatabaseRemoveError());
      if (!entryDeleted) return next(new NotFoundError(models.MODEL_NAME_LANGUAGE));
      res.json(new DeleteDocumentResponse(entryDeleted));
    });
};