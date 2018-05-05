"use strict";

var userCanEditUserData = require("../../helpers").userCanEditUserData,
  getPageCount = require("../../helpers").getPageCount;

// Schemas
const Group = require('../../models/group.schema');

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

/* Groups page. */
exports.get = function(req, res, next) {
  var filter = req.queryParsed.filter || {};
  filter.user = req.params[PARAM_ID_USER];

  Group
    .find(filter)
    .select(req.queryParsed.select)
    .limit(req.queryParsed.cursor.limit)
    .skip(req.queryParsed.cursor.skip)
    .sort(req.queryParsed.cursor.sort)
    .exec(function(err, groups) {
      if (err) return next(new DatabaseFindError());
      if (!groups || groups.length <= 0) return next(new NotFoundError(MODEL_NAME_EDUCATION));
      Group
        .count(req.queryParsed.filter)
        .exec(function(err, count) {
          if (err) return next(new DatabaseCountError());
          res.json(new SelectDocumentsResponse(groups, count, getPageCount(count, req.queryParsed.cursor.limit)));
        });
    });
};

exports.post = function(req, res, next) {
  const userId = req.params[PARAM_ID_USER];
  if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

  var group = req.body.data;
  group.user = userId;
  group = new Group(group);

  group.save(function(err, groupSaved) {
    if (err) return next(new DatabaseCreateError(err.message)());
    res.json(new CreateDocumentResponse(groupSaved));
  });
};

exports.put = function(req, res, next) {
  const userId = req.params[PARAM_ID_USER];
  if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

  const groups = req.body.data;
  var groupsUpdated = [];
  Async.eachOf(groups, function(group, key, callback) {
    const filterUpdate = {
      _id: group._id,
      user: userId
    };
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

exports.delete = function(req, res, next) {
  const userId = req.params[PARAM_ID_USER];
  if (!userCanEditUserData(req.loggedUser, userId)) return next(new MissingPrivilegeError());

  Group
    .remove({
      user: userId
    })
    .exec(function(err, removed) {
      if (err) return next(new DatabaseRemoveError());
      res.json(new DeleteDocumentsResponse(JSON.parse(removed).n));
    });
};