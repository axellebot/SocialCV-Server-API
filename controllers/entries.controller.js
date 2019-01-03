"use strict";

const db = require('@db');

// Constants
const messages = require('@constants/messages');
const statuses = require('@constants/statuses');
const models = require('@constants/models');
const parameters = require('@constants/parameters');

// Errors
const DatabaseFindError = require('@errors/DatabaseFindError');
const DatabaseCountError = require('@errors/DatabaseCountError');
const DatabaseCreateError = require('@errors/DatabaseCreateError');
const DatabaseUpdateError = require('@errors/DatabaseUpdateError');
const DatabaseRemoveError = require('@errors/DatabaseRemoveError');
const NotFoundError = require('@errors/NotFoundError');
const NotImplementedError = require('@errors/NotImplementedError');

// Responses
const SelectDocumentsResponse = require('@responses/SelectDocumentsResponse');
const SelectDocumentResponse = require('@responses/SelectDocumentResponse');
const CreateDocumentResponse = require('@responses/CreateDocumentResponse');
const UpdateDocumentsResponse = require('@responses/UpdateDocumentsResponse');
const UpdateDocumentResponse = require('@responses/UpdateDocumentResponse');
const DeleteDocumentsResponse = require('@responses/DeleteDocumentsResponse');
const DeleteDocumentResponse = require('@responses/DeleteDocumentResponse');

exports.findOne = (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_ENTRY];

  db.entries
    .findById(id)
    .then((entry) => {
      if (!entry) throw new NotFoundError(models.MODEL_NAME_ENTRY);
      res.json(new SelectDocumentResponse(entry));
    })
    .catch((err) => {
      next(err);
    });
};

exports.createOne = (req, res, next) => {
  const entry =  db.entries.create(req.body.data);

  entry.save()
    .then((entrySaved) => {
      res.json(new CreateDocumentResponse(entrySaved));
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateOne = (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_ENTRY];

  db.entries
    .findOneAndUpdate({
      _id: id
    }, req.body.data, {
      new: true
    })
    .then((entryUpdated) => {
      if (!entryUpdated) throw new NotFoundError(models.MODEL_NAME_ENTRY);
      res.json(new UpdateDocumentResponse(entryUpdated));
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteOne = (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_ENTRY];

  db.entries
    .findOneAndRemove({
      _id: id
    })
    .then((entryDeleted) => {
      if (!entryDeleted) throw new NotFoundError(models.MODEL_NAME_ENTRY);
      res.json(new DeleteDocumentResponse(entryDeleted));
    })
    .catch((err) => {
      next(err);
    });
};

exports.findMany = (req, res, next) => {
  var returnedEntries;
  db.entries
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .then((entries) => {
      if (!entries || entries.length <= 0) throw new NotFoundError(models.MODEL_NAME_ENTRY);
      returnedEntries = entries;
      return db.entries.countDocuments(req.query.filters);
    })
    .then((total) => {
      res.json(new SelectDocumentsResponse(returnedEntries, total));
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
}