"use strict";

// Requires packages
const Async = require('async');

// Helpers
const userCanEditUserData = require("../../helpers").userCanEditUserData;
const getPageCount = require("../../helpers").getPageCount;

// Schemas
const Part = require('../../models/part.schema');

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

/* Parts page. */
exports.get = function(req, res, next) {
  var filter = req.queryParsed.filter || {};
  filter.user = req.params[parameters.PARAM_ID_USER];

  Part
    .find(filter)
    .select(req.queryParsed.select)
    .limit(req.queryParsed.cursor.limit)
    .skip(req.queryParsed.cursor.skip)
    .sort(req.queryParsed.cursor.sort)
    .exec(function(err, parts) {
      if (err) return next(new DatabaseFindError());
      if (!parts || parts.length <= 0) return next(new NotFoundError(models.MODEL_NAME_FRAMEWORK_TAG));
      Part
        .count(req.queryParsed.filter)
        .exec(function(err, count) {
          if (err) return next(new DatabaseCountError());
          res.json(new SelectDocumentsResponse(parts, count, getPageCount(count, req.queryParsed.cursor.limit)));
        });
    });
};
exports.post = function(req, res, next) {
  const userId = req.params[parameters.PARAM_ID_USER];
  if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

  var part = req.body.data;
  part.user = userId;
  part = new Part(part);

  part.save(function(err, partSaved) {
    if (err) return next(new DatabaseCreateError(err.message)());
    res.json(new CreateDocumentResponse(partSaved));
  });
};
exports.put = function(req, res, next) {
  const userId = req.params[parameters.PARAM_ID_USER];
  if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

  const parts = req.body.data;
  var partsUpdated = [];
  Async.eachOf(parts, function(part, key, callback) {
    const filterUpdate = {
      _id: part._id,
      user: userId
    };
    Part
      .findOneAndUpdate(filterUpdate, part, {
        new: true
      }, function(err, partUpdated) {
        if (err) return callback(err);
        if (partUpdated) partsUpdated.push(partUpdated);
        callback();
      });
  }, function(err) {
    if (err) return next(new DatabaseUpdateError());
    res.json(new UpdateDocumentsResponse(partsUpdated));
  });
};
exports.delete = function(req, res, next) {
  const userId = req.params[parameters.PARAM_ID_USER];
  if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

  Part
    .remove({
      user: userId
    })
    .exec(function(err, removed) {
      if (err) return next(new DatabaseRemoveError());
      res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
    });
};