"use strict";

// Required packages
var oauthServer = require('oauth2-server');

// Config
var config = require('@config')

var oauth = new oauthServer({
  model: require('@models/oauth/oauth.model.js'),
});

module.exports = oauth;