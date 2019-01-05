"use strict";

// Others
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

exports.findOne = async (req, res, next) => {
  try {
    const id = req.params[parameters.PARAM_ID_ENTRY];

    var entry = await db.entries.findById(id);
    if (!entry) throw new NotFoundError(models.MODEL_NAME_ENTRY);
    res.json(new SelectDocumentResponse(entry));
  } catch (err) {
    next(err);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    var entrySaved = await db.entries.create(req.body.data);
    res.json(new CreateDocumentResponse(entrySaved));
  } catch (err) {
    next(err);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params[parameters.PARAM_ID_ENTRY];

    var entryUpdated = await db.entries.findOneAndUpdate({
      _id: id
    }, req.body.data, {
      new: true
    });

    if (!entryUpdated) throw new NotFoundError(models.MODEL_NAME_ENTRY);
    res.json(new UpdateDocumentResponse(entryUpdated));
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params[parameters.PARAM_ID_ENTRY];

    var entryDeleted = await db.entries.findOneAndRemove({
      _id: id
    });
    if (!entryDeleted) throw new NotFoundError(models.MODEL_NAME_ENTRY);
    res.json(new DeleteDocumentResponse(entryDeleted));
  } catch (err) {
    next(err);
  }
};

exports.findMany = async (req, res, next) => {
  try {
    var entries = await db.entries
      .find(req.query.filters)
      .select(req.query.fields)
      .skip(req.query.offset)
      .limit(req.query.limit)
      .sort(req.query.sort);

    if (!entries || entries.length <= 0) throw new NotFoundError(models.MODEL_NAME_ENTRY);
    var count = await db.entries.countDocuments(req.query.filters);
    res.json(new SelectDocumentsResponse(entries, count));
  } catch (err) {
    next(err);
  }
};

exports.updateMany = async (req, res, next) => {
  next(new NotImplementedError())
};

exports.deleteAll = async (req, res, next) => {
  next(new NotImplementedError())
}