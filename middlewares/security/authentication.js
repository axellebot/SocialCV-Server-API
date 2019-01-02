"use strict";

// Require Packages
const moment = require('moment');
const oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;

// Config
var config = require('@config');

// Errors
const AccessRestrictedError = require('@errors/AccessRestrictedError');
const FailedAuthenticationTokenError = require('@errors/FailedAuthenticationTokenError');
const ExpiredAuthenticationTokenError = require('@errors/ExpiredAuthenticationTokenError');
const UserNotFoundError = require('@errors/UserNotFoundError');
const UserDisabledError = require('@errors/UserDisabledError');

// Schemas
const User = require('@models/user.model');

// OAuth
const oauth = require('@oauth');

/**
 * @param options
 */
module.exports = function(options) {
  var options = options || {};
  return function(req, res, next) {
    var request = new Request({
      headers: {
        authorization: req.headers.authorization
      },
      method: req.method,
      query: req.query,
      body: req.body
    });
    var response = new Response(res);
    oauth.authenticate(request, response, options)
      .then(function(token) {
        if(!token) throw FailedAuthenticationTokenError();
        // Request is authorized.
        console.log('token',token);
        
        return User.findOne(token.user)
        .populate('permission')
        .exec();
      })
    .then(function(user){
      req.user=user;
      next();
    })
      .catch(function(err) {
        next(err);
      });
  };
}