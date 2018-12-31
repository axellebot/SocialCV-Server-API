"use strict";

// Schemas
const User = require('@models/user.model');

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
const MissingPrivilegeError = require('@errors/MissingPrivilegeError');
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
  const id = req.params[parameters.PARAM_ID_USER];

  User
    .findById(id)
    .then((user) => {
      if (!user) throw new NotFoundError(models.MODEL_NAME_USER);
      res.json(new SelectDocumentResponse(user.publicData()));
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateOne = (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_USER];

  User
    .findOneAndUpdate({
      _id: id
    }, req.body.data, {
      returnNewDocument: true,
    })
    .then((userUpdated) => {
      if (!userUpdated) throw new NotFoundError(models.MODEL_NAME_USER);
      res.json(new UpdateDocumentResponse(userUpdated.publicData()));
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteOne = (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_USER];

  User
    .findOneAndRemove({
      _id: id
    })
    .then((userDeleted) => {
      if (!userDeleted) throw new NotFoundError(models.MODEL_NAME_USER);
      res.json(new DeleteDocumentResponse(userDeleted.publicData()));
    })
    .catch((err) => {
      next(err);
    });
};

exports.findMany = (req, res, next) => {
  var returnedUsers;
  User
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .then((users) => {
      if (!users || users.length <= 0) throw new NotFoundError(models.MODEL_NAME_USER);
      returnedUsers = users;
      return User.countDocuments(req.query.filters)
    })
    .then((count) => {
      for(var index in returnedUsers) { 
        returnedUsers[index]=returnedUsers[index].publicData(); 
      }
      res.json(new SelectDocumentsResponse(returnedUsers, count));
    })
    .catch((err) => {
      next(err);
    });
};

exports.createOne = (req, res, next) => {
  //TODO : users - Create user
  next(new NotImplementedError("Create a new user"));
};

exports.updateMany = (req, res, next) => {
  next(new NotImplementedError("Update many users"));
};

exports.deleteAll = (req, res, next) => {
  next(new NotImplementedError("Delete All users"));
};