"use strict";

// Schemas
const Profile = require('../models/profile.model');

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

exports.createOne = (req, res, next) => {
  var profile = req.body.data;
  profile = new Profile(profile);

  profile
    .save()
    .then((profileSaved) => {
      res.json(new CreateDocumentResponse(profileSaved));
    })
    .catch((err) => {
      next(err);
    });
};

exports.findOne = (req, res, next) => {
  var id = req.params[parameters.PARAM_ID_PROFILE];

  Profile
    .findById(id)
    .then((profile) => {
      if (!profile) throw new NotFoundError(models.MODEL_NAME_PROFILE);
      res.json(new SelectDocumentResponse(profile));
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateOne = (req, res, next) => {
  var id = req.params[parameters.PARAM_ID_PROFILE];

  Profile
    .findOneAndUpdate({
      _id: id
    }, req.body.data, {
      new: true
    })
    .then((profileUpdated) => {
      if (!profileUpdated) throw new NotFoundError(parameters.MODEL_NAME_PROFILE);
      res.json(new UpdateDocumentResponse(profileUpdated));
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteOne = (req, res, next) => {
  var id = req.params[parameters.PARAM_ID_PROFILE];

  Profile
    .findOneAndRemove({
      _id: id
    })
    .then((profileDeleted) => {
      if (!profileDeleted) throw new NotFoundError(models.MODEL_NAME_PROFILE);
      res.json(new DeleteDocumentResponse(profileDeleted));
    })
    .catch((err) => {
      next(err);
    });
};

exports.findMany = (req, res, next) => {
  var returnedProfiles;

  Profile
    .find(req.query.filters)
    .select(req.query.fields)
    .skip(req.query.offset)
    .limit(req.query.limit)
    .sort(req.query.sort)
    .then((profiles) => {
      if (!profiles || profiles.length <= 0) throw new NotFoundError(models.MODEL_NAME_PROFILE);
      returnedProfiles = profiles;
      return Profile.count(req.query.filter);
    })
    .then((total) => {
      res.json(new SelectDocumentsResponse(returnedProfiles, total));
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateMany = (req, res, next) => {
  return next(new NotImplementedError("Update many Profiles"));
};

exports.deleteAll = (req, res, next) => {
  return next(new NotImplementedError("Delete all Profiles"));
};