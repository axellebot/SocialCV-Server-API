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

// One
exports.createOne = async (req, res, next) => {
  try {
    var profileSaved = await db.profiles.create(req.body.data);
    res.json(new CreateDocumentResponse(profileSaved));
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try{
  const id = req.params[parameters.PARAM_ID_PROFILE];

  var profile = await db.profiles.findById(id);
  if (!profile) throw new NotFoundError(models.MODEL_NAME_PROFILE);
  res.json(new SelectDocumentResponse(profile));
  }catch(err){
    next(err);
  }
};

exports.updateOne = async (req, res, next) => {
  try{
  const id = req.params[parameters.PARAM_ID_PROFILE];

  var profileUpdated = db.profiles.findOneAndUpdate({
    _id: id
  }, req.body.data, {
    new: true
  });
  if (!profileUpdated) throw new NotFoundError(parameters.MODEL_NAME_PROFILE);
  res.json(new UpdateDocumentResponse(profileUpdated));
  }catch(err){
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try{
  const id = req.params[parameters.PARAM_ID_PROFILE];

  var profileDeleted = await db.profiles.findOneAndRemove({
    _id: id
  });
  if (!profileDeleted) throw new NotFoundError(models.MODEL_NAME_PROFILE);
  res.json(new DeleteDocumentResponse(profileDeleted));
  }catch(err){
    next(err);
  }
};

// Many
exports.findMany = async (req, res, next) => {
try{
  var profiles = await db.profiles
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort);

  if (!profiles || profiles.length <= 0) throw new NotFoundError(models.MODEL_NAME_PROFILE);
  var count = await db.profiles.countDocuments(req.query.filters);
  res.json(new SelectDocumentsResponse(profiles, count));
}catch(err){
  next(err);
}
};

exports.updateMany = async (req, res, next) => {
  return next(new NotImplementedError("Update many Profiles"));
};

exports.deleteAll = async (req, res, next) => {
  return next(new NotImplementedError("Delete all Profiles"));
};

// Others
exports.filterPartsOfOne = async (req, res, next) => {
  const id = req.params[parameters.PARAM_ID_PROFILE];
  req.query.filters.profile = id;
  next();
};