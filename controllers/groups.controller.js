"use strict";

// Others
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

// One
exports.findOne = async (req, res, next) => {
  try{
    const id = req.params[parameters.PARAM_ID_GROUP];

    var group = await db.groups.findById(id);
    if (!group) throw NotFoundError(models.MODEL_NAME_GROUP);
    res.json(new SelectDocumentResponse(group));
  }catch(err){
    next(err);
  }
};

exports.createOne = async (req, res, next) => {
  try{
    const groupSaved = await db.groups.create(req.body.data);
    res.json(new CreateDocumentResponse(groupSaved));
  }catch(err){
    next(err);
  }
};

exports.updateOne = async (req, res, next) => {
  try{
    const id = req.params[parameters.PARAM_ID_GROUP];

    var groupUpdated = await db.groups.findByIdAndUpdate(id, req.body.data, {
      new: true
    });
    if (!groupUpdated) throw new NotFoundError(models.MODEL_NAME_GROUP);
    res.json(new UpdateDocumentResponse(groupUpdated));
  }catch(err){
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try{
  const id = req.params[parameters.PARAM_ID_GROUP];

  var groupDeleted = await db.groups.findOneAndRemove({
    _id: id
  });
  if (!groupDeleted) throw new NotFoundError(models.MODEL_NAME_GROUP);
  res.json(new DeleteDocumentResponse(groupDeleted));
  }catch(err){
    next(err);
  }
};

// Many
exports.findMany = async (req, res, next) => {
  try{
  var groups = await db.groups.find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort);
  if (!groups || groups.length <= 0) throw new NotFoundError(models.MODEL_NAME_GROUP);

  var count = await db.groups.countDocuments(req.query.filters)
  res.json(new SelectDocumentsResponse(groups, count));
  }catch(err){
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
exports.filterEntriesOfOne = async (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_GROUP];
  req.query.filters.group = id;
  next();
};