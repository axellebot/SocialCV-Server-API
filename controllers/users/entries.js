"use strict";

// Requires packages
const Async = require('async');

// Helpers
const getPageCount = require("../../helpers").getPageCount;

// Schemas
const Entry = require('../../models/entry.schema');

// Constants
const messages = require('../../constants/messages');
const statuses = require('../../constants/statuses');
const models = require('../../constants/models');
const collections = require('../../constants/collections');
const roles = require('../../constants/roles');
const parameters = require('../../constants/parameters');

// Errors
const DatabaseFindError = require('../../errors/DatabaseFindError');
const DatabaseCountError = require('../../errors/DatabaseCountError');
const DatabaseCreateError = require('../../errors/DatabaseCreateError');
const DatabaseUpdateError = require('../../errors/DatabaseUpdateError');
const DatabaseRemoveError = require('../../errors/DatabaseRemoveError');
const NotFoundError = require('../../errors/NotFoundError');
const MissingPrivilegeError = require('../../errors/MissingPrivilegeError');

// Responses
const SelectDocumentsResponse = require('../../responses/SelectDocumentsResponse');
const SelectDocumentResponse = require('../../responses/SelectDocumentResponse');
const CreateDocumentResponse = require('../../responses/CreateDocumentResponse');
const UpdateDocumentsResponse = require('../../responses/UpdateDocumentsResponse');
const UpdateDocumentResponse = require('../../responses/UpdateDocumentResponse');
const DeleteDocumentsResponse = require('../../responses/DeleteDocumentsResponse');
const DeleteDocumentResponse = require('../../responses/DeleteDocumentResponse');

/* Entries page. */
exports.get = function(req, res, next) {
  var filters = req.query.filters || {};
  filters.user = req.params[parameters.PARAM_ID_USER];

  Entry
    .find(filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .exec(function(err, entries) {
      if (err) return next(new DatabaseFindError());
      if (!entries || entries.length <= 0) return next(new NotFoundError(models.MODEL_NAME_LINK));
      Entry
        .count(req.query.filter)
        .exec(function(err, count) {
          if (err) return next(new DatabaseCountError());
          res.json(new SelectDocumentsResponse(entries, count, getPageCount(count, req.query.limit)));
        });
    });
};

exports.post = function(req, res, next) {
  const userId = req.params[parameters.PARAM_ID_USER];

  var entry = req.body.data;
  entry.user = userId;
  entry = new Entry(entry);

  entry.save(function(err, entrySaved) {
    if (err) return next(new DatabaseCreateError(err.message)());
    res.json(new CreateDocumentResponse(entrySaved));
  });
};

exports.put = function(req, res, next) {
  const userId = req.params[parameters.PARAM_ID_USER];

  const entries = req.body.data;
  var entriesUpdated = [];
  Async.eachOf(entries, function(entry, key, callback) {
    const filterUpdate = {
      _id: entry._id,
      user: userId
    };
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

exports.delete = function(req, res, next) {
  const userId = req.params[parameters.PARAM_ID_USER];

  Entry
    .remove({
      user: userId
    })
    .exec(function(err, removed) {
      if (err) return next(new DatabaseRemoveError());
      res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
    });
};