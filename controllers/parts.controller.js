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

exports.findOne = async (req, res, next) => {
  try {
    const id = req.params[parameters.PARAM_ID_PART];

    var part = db.parts.findById(id);
    if (!part) throw new NotFoundError(models.MODEL_NAME_PART);
    res.json(new SelectDocumentResponse(part));
  } catch (err) {
    next(err);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const partSaved = await cd.parts.create(req.body.data);

    res.json(new CreateDocumentResponse(partSaved));
  } catch (err) {
    next(err);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params[parameters.PARAM_ID_PART];

    var partUpdated = await db.parts
      .findOneAndUpdate({
        _id: id
      }, req.body.data, {
        new: true
      });
    if (!partUpdated) throw new NotFoundError(models.MODEL_NAME_PART);
    res.json(new UpdateDocumentResponse(partUpdated));
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params[parameters.PARAM_ID_PART];

    var partDeleted = await db.parts.findOneAndRemove({
      _id: id
    });
    if (!partDeleted) throw new NotFoundError(models.MODEL_NAME_PART);
    res.json(new DeleteDocumentResponse(partDeleted));
  } catch (err) {
    next(err);
  }
};

exports.findMany = async (req, res, next) => {
  try {
    var parts = await db.parts
      .find(req.query.filters)
      .select(req.query.fields)
      .skip(req.query.offset)
      .limit(req.query.limit)
      .sort(req.query.sort);

    if (!parts || parts.length <= 0) throw new NotFoundError(models.MODEL_NAME_PART);
    var count = await db.parts.countDocuments(req.query.filters);
    res.json(new SelectDocumentsResponse(parts, count));
  } catch (err) {
    next(err);
  }
};

exports.updateMany = async (req, res, next) => {
  next(new NotImplementedError())
};

exports.deleteAll = async (req, res, next) => {
  next(new NotImplementedError())
};

// Others
exports.filterGroupsOfOne = async (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_PART];
  req.query.filters.part = id;
  next();
};