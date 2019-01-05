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

exports.createOne = async (req, res, next) => {
  try {
    var permissionSaved = await db.permissions.create(req.body.data);
    res.json(new CreateDocumentResponse(permissionSaved));
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    var id = req.params[parameters.PARAM_ID_PERMISSION];

    var permissions = await db.permissions.findById(id);
    if (!permission) throw new NotFoundError(models.MODEL_NAME_PERMISSION);
    res.json(new SelectDocumentResponse(permission));
  } catch (err) {
    next(err);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    var id = req.params[parameters.PARAM_ID_PERMISSION];

    var permissionUpdated = await db.permissions
      .findOneAndUpdate({
        _id: id
      }, req.body.data, {
        new: true
      });
    if (!permissionUpdated) throw new NotFoundError(parameters.MODEL_NAME_PERMISSION);
    res.json(new UpdateDocumentResponse(permissionUpdated));
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    var id = req.params[parameters.PARAM_ID_PERMISSION];

    var permissionDeleted = await db.permissions.findOneAndRemove({
      _id: id
    });
    if (!permissionDeleted) throw new NotFoundError(models.MODEL_NAME_PERMISSION);
    res.json(new DeleteDocumentResponse(permissionDeleted));
  } catch (err) {
    next(err);
  }
};

exports.findMany = async (req, res, next) => {
  try {
    var permissions = await db.permissions
      .find(req.query.filters)
      .select(req.query.fields)
      .skip(req.query.offset)
      .limit(req.query.limit)
      .sort(req.query.sort);
    if (!permissions || permissions.length <= 0) throw new NotFoundError(models.MODEL_NAME_PERMISSION);
    returnedPermissions = permissions;
    var count = await db.permissions.countDocuments(req.query.filters);
    res.json(new SelectDocumentsResponse(permissions, count));
  } catch (err) {
    next(err);
  }
};

exports.updateMany = async (req, res, next) => {
  return next(new NotImplementedError("Update many Permissions"));
};

exports.deleteAll = async (req, res, next) => {
  return next(new NotImplementedError("Delete all Permissions"));
};