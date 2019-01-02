"use strict";

// Requires Packages
var oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;

// OAuth
const oauth = require('@oauth');

// Schemas
const User = require('@models/user.model');
const OAuthAccessToken = require('@models/oauth/oauth_access_token.model');
const OAuthAuthorizationCode = require('@models/oauth/oauth_authorization_code.model');
const OAuthClient = require('@models/oauth/oauth_client.model');
const OAuthRefreshToken = require('@models/oauth/oauth_refresh_token.model');
const OAuthScope = require('@models/oauth/oauth_scope.model');

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
// Token Controller (access and refresh token)
//= =======================================
exports.getToken = function(req, res, next) {
  var request = new Request(req);
  var response = new Response(res);

  oauth.token(request, response)
    .then(function(token) {
      if (!token) throw NotFoundError('Access token');
     
      var returnToken = {};
      
      if (token.accessToken) returnToken.access_token = token.accessToken;
      if (token.tokenType) returnToken.token_type = token.tokenType;
      if (token.accessTokenExpiresAt){
        var endDate = token.accessTokenExpiresAt;
        var startDate = new Date();
        console.log(endDate,startDate);
        var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        var diff = Math.trunc(Math.abs(seconds));
        returnToken.expires_in = diff || 0;
      }
      if (token.refreshToken) returnToken.refresh_token = token.refreshToken;
      if (token.tokenType) returnToken.token_type = token.tokenType;
      
      return res.json(returnToken);
    })
    .catch(function(err) {
      return next(err)
    })
};

//= =======================================
// Authorise Controller
//= =======================================
exports.authorize = function(req, res, next) {
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