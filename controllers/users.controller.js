"use strict";

const db = require('@db');

// Constants
const messages = require('@constants/messages');
const statuses = require('@constants/statuses');
const models = require('@constants/models');
const parameters = require('@constants/parameters');

// Errors
const AccessRestrictedError=require('@errors/AccessRestrictedError');
const BodyMissingDataError =require('@errors/BodyMissingDataError');
const BodyMissingTokenError =require('@errors/BodyMissingTokenError');
const BodyWrongDataError =require('@errors/BodyWrongDataError');
const ClientMissingPrivilegeError=require('@errors/ClientMissingPrivilegeError');
const CursorWrongPaginationError=require('@errors/CursorWrongPaginationError');
const CursorWrongSortError=require('@errors/CursorWrongSortError');
const DatabaseCountError = require('@errors/DatabaseCountError');
const DatabaseCreateError = require('@errors/DatabaseCreateError');
const DatabaseFindError = require('@errors/DatabaseFindError');
const DatabaseRemoveError = require('@errors/DatabaseRemoveError');
const DatabaseUpdateError = require('@errors/DatabaseUpdateError');
const NotFoundError = require('@errors/NotFoundError');
const NotImplementedError = require('@errors/NotImplementedError');
const ProtocolWrongError= require('@errors/ProtocolWrongError');
const TokenAuthenticationError = require('@errors/TokenAuthenticationError');
const TokenExpiredError = require('@errors/TokenExpiredError');
const UserDisabledError =require('@errors/UserDisabledError');
const UserMissingEmailError=require('@errors/UserMissingEmailError');
const UserMissingPasswordError=require('@errors/UserMissingPasswordError');
const UserMissingPrivilegeError = require('@errors/UserMissingPrivilegeError');
const UserMissingUsernameError = require('@errors/UserMissingUsernameError');
const UserNotFoundError = require('@errors/UserNotFoundError');
const UserWrongPasswordError = require('@errors/UserWrongPasswordError');

// Responses
const SelectDocumentsResponse = require('@responses/SelectDocumentsResponse');
const SelectDocumentResponse = require('@responses/SelectDocumentResponse');
const CreateDocumentResponse = require('@responses/CreateDocumentResponse');
const UpdateDocumentsResponse = require('@responses/UpdateDocumentsResponse');
const UpdateDocumentResponse = require('@responses/UpdateDocumentResponse');
const DeleteDocumentsResponse = require('@responses/DeleteDocumentsResponse');
const DeleteDocumentResponse = require('@responses/DeleteDocumentResponse');


exports.findOne = async (req, res, next) => {
  try{
  const id = req.params[parameters.PARAM_ID_USER];

  var user = await db.users.findById(id);
  if (!user) throw new NotFoundError(models.MODEL_NAME_USER);
  res.json(new SelectDocumentResponse(user.publicData()));
  }catch(err){
    next(err);
  }
};

exports.updateOne = async (req, res, next) => {
try{
  const id = req.params[parameters.PARAM_ID_USER];

  var userUpdated = await db.users
    .findOneAndUpdate({
      _id: id
    }, req.body.data, {
      returnNewDocument: true,
    });
  if (!userUpdated) throw new NotFoundError(models.MODEL_NAME_USER);
  res.json(new UpdateDocumentResponse(userUpdated.publicData()));
}catch(err){
  next(err);
}
};

exports.deleteOne = async (req, res, next) => {
  try{
  const id = req.params[parameters.PARAM_ID_USER];

  var userDeleted = await db.users.findOneAndRemove({
    _id: id
  });
  if (!userDeleted) throw new NotFoundError(models.MODEL_NAME_USER);
  res.json(new DeleteDocumentResponse(userDeleted.publicData()));
  }catch(err){
    next(err);
  }
};

exports.findMany = async (req, res, next) => {
  try{
  var users = await db.users.find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort);

  if (!users || users.length <= 0) throw new NotFoundError(models.MODEL_NAME_USER);
  returnedUsers = users;
  var count = await db.users.countDocuments(req.query.filters);

  for (var index in users) {
    users[index] = users[index].publicData();
  }

  res.json(new SelectDocumentsResponse(users, count));
  }catch(err){
    next(err);
  }
};

exports.createOne = async (req, res, next) => {
  //TODO : users - Create user
  next(new NotImplementedError("Create a new user"));
};

exports.updateMany = async (req, res, next) => {
  next(new NotImplementedError("Update many users"));
};

exports.deleteAll = async (req, res, next) => {
  next(new NotImplementedError("Delete All users"));
};