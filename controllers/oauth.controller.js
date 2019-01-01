"use strict";

// Requires Packages
var oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;

// OAuth
const oauth = require('@oauth');

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
const LoginResponse = require('@responses/LoginResponse');


//= =======================================
// Access Token Controller
//= =======================================
exports.access_token = function(req, res, next) {
  var request = new Request(req);
  var response = new Response(res);

  oauth.token(request, response)
    .then(function(token) {
      // Todo: remove unnecessary values in response
      return res.json(token)
    })
    .catch(function(err) {
      return next(err)
    })
};

//= =======================================
// Authorise Controller
//= =======================================
exports.authorise = function(req, res, next) {
  var request = new Request(req);
  var response = new Response(res);

  return oauth.authorize(request, response)
    .then(function(success) {
      res.json(success)
    })
    .catch(function(err) {
      next(err)
    })
};