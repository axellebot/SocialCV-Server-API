"use strict";

// Requires packages
const Async = require('async');

// Schemas
const Group = require('../models/group.model');

// Constants
const messages = require('../constants/messages');
const statuses = require('../constants/statuses');
const models = require('../constants/models');
const roles = require('../constants/roles');
const parameters = require('../constants/parameters');

// Errors
const DatabaseFindError = require('../errors/DatabaseFindError');
const DatabaseCountError = require('../errors/DatabaseCountError');
const DatabaseCreateError = require('../errors/DatabaseCreateError');
const DatabaseUpdateError = require('../errors/DatabaseUpdateError');
const DatabaseRemoveError = require('../errors/DatabaseRemoveError');
const NotFoundError = require('../errors/NotFoundError');
const NotImplementedError = require('../errors/NotImplementedError');

// Responses
const SelectDocumentsResponse = require('../responses/SelectDocumentsResponse');
const SelectDocumentResponse = require('../responses/SelectDocumentResponse');
const CreateDocumentResponse = require('../responses/CreateDocumentResponse');
const UpdateDocumentsResponse = require('../responses/UpdateDocumentsResponse');
const UpdateDocumentResponse = require('../responses/UpdateDocumentResponse');
const DeleteDocumentsResponse = require('../responses/DeleteDocumentsResponse');
const DeleteDocumentResponse = require('../responses/DeleteDocumentResponse');

exports.findOne = (req, res, next) => {
  var id = req.params[parameters.PARAM_ID_GROUP];
  console.log(req.params);
  Group
    .findById(id)
    .then((group) => {
      if (!group) throw new NotFoundError(models.MODEL_NAME_GROUP);
      res.json(new SelectDocumentResponse(group));
    })
    .catch((err) => {
      next(err);
    });
};

exports.createOne = (req, res, next) => {
  var group = new Group(req.body.data);

  group.save()
    .then((groupSaved) => {
      res.json(new CreateDocumentResponse(groupSaved));
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateOne = (req, res, next) => {
  var id = req.params[parameters.PARAM_ID_GROUP];
  
  Group
    .findByIdAndUpdate(id, req.body.data, {
      new: true
    })
    .then((groupUpdated) => {
      if (!groupUpdated) throw next(new NotFoundError(models.MODEL_NAME_GROUP));
      res.json(new UpdateDocumentResponse(groupUpdated));
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteOne = (req, res, next) => {
  var id = req.params[parameters.PARAM_ID_GROUP];
  
  Group
    .findOneAndRemove({
      _id: id
    })
    .then((groupDeleted) => {
      if (!groupDeleted) throw next(new NotFoundError(models.MODEL_NAME_GROUP));
      res.json(new DeleteDocumentResponse(groupDeleted));
    })
    .catch((err) => {
      next(err);
    });
};

exports.findMany = (req, res, next) => {
  var returnedGroups;
  Group
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .then((groups) => {
      if (!groups || groups.length <= 0) return next(new NotFoundError(models.MODEL_NAME_GROUP));
      returnedGroups = groups;
      return Group.count(req.query.filter)
    })
    .then((total) => {
      res.json(new SelectDocumentsResponse(returnedGroups, total));
    })
    .catch((err) => {
      next(err);
    });

};

exports.updateMany = (req, res, next) => {
  next(new NotImplementedError())
};

exports.deleteAll = (req, res, next) => {
  next(new NotImplementedError())
};