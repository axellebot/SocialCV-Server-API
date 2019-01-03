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

exports.createOne = (req, res, next) => {
  var permission = req.body.data;
  permission = db.permissions.create(permission);

  permission
    .save()
    .then((permissionSaved) => {
      res.json(new CreateDocumentResponse(permissionSaved));
    })
    .catch((err) => {
      next(err);
    });
};

exports.findOne = (req, res, next) => {
  var id = req.params[parameters.PARAM_ID_PERMISSION];

  db.permissions
    .findById(id)
    .then((permission) => {
      if (!permission) throw new NotFoundError(models.MODEL_NAME_PERMISSION);
      res.json(new SelectDocumentResponse(permission));
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateOne = (req, res, next) => {
  var id = req.params[parameters.PARAM_ID_PERMISSION];

  db.permissions
    .findOneAndUpdate({
      _id: id
    }, req.body.data, {
      new: true
    })
    .then((permissionUpdated) => {
      if (!permissionUpdated) throw new NotFoundError(parameters.MODEL_NAME_PERMISSION);
      res.json(new UpdateDocumentResponse(permissionUpdated));
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteOne = (req, res, next) => {
  var id = req.params[parameters.PARAM_ID_PERMISSION];

  db.permissions
    .findOneAndRemove({
      _id: id
    })
    .then((permissionDeleted) => {
      if (!permissionDeleted) throw new NotFoundError(models.MODEL_NAME_PERMISSION);
      res.json(new DeleteDocumentResponse(permissionDeleted));
    })
    .catch((err) => {
      next(err);
    });
};

exports.findMany = (req, res, next) => {
  var returnedPermissions;

  db.permissions
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .then((permissions) => {
      if (!permissions || permissions.length <= 0) throw new NotFoundError(models.MODEL_NAME_PERMISSION);
      returnedPermissions = permissions;
      return db.permissions.countDocuments(req.query.filters);
    })
    .then((total) => {
      res.json(new SelectDocumentsResponse(returnedPermissions, total));
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateMany = (req, res, next) => {
  return next(new NotImplementedError("Update many Permissions"));
};

exports.deleteAll = (req, res, next) => {
  return next(new NotImplementedError("Delete all Permissions"));
};