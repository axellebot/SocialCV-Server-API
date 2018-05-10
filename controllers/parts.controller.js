"use strict";

// Schemas
const Part = require('../models/part.model');

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
  const id = req.params[parameters.PARAM_ID_PART];

  Part
    .findById(id)
    .then((part) => {
      if (!part) throw new NotFoundError(models.MODEL_NAME_PART);
      res.json(new SelectDocumentResponse(part));
    })
    .catch((err) => {
      next(err);
    });
};

exports.createOne = (req, res, next) => {
  var part = new Part(req.body.data);

  part.save()
    .then((partSaved) => {
      res.json(new CreateDocumentResponse(partSaved));
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateOne = (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_PART];

  Part
    .findOneAndUpdate({
      _id: id
    }, req.body.data, {
      new: true
    })
    .then((partUpdated) => {
      if (!partUpdated) throw new NotFoundError(models.MODEL_NAME_PART);
      res.json(new UpdateDocumentResponse(partUpdated));
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteOne = (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_PART];

  Part
    .findOneAndRemove({
      _id: id
    })
    .then((partDeleted) => {
      if (!partDeleted) throw new NotFoundError(models.MODEL_NAME_PART);
      res.json(new DeleteDocumentResponse(partDeleted));
    })
    .catch((err) => {
      next(err);
    });
};

exports.findMany = (req, res, next) => {
  var returnedParts;

  Part
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .then((parts) => {
      if (!parts || parts.length <= 0) throw new NotFoundError(models.MODEL_NAME_PART);
      returnedParts = parts;
      return Part
        .count(req.query.filter);
    })
    .then((total) => {
      res.json(new SelectDocumentsResponse(returnedParts, total));
    })
    .catch((err) => {
      next(err);
    })
};

exports.updateMany = (req, res, next) => {
  next(new NotImplementedError())
};

exports.deleteAll = (req, res, next) => {
  next(new NotImplementedError())
};