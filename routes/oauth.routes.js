"use strict";

// Constants
const parameters = require('@constants/parameters');
const paths = require('@constants/paths');

// Middlewares
const requireAuthentication = require('@middlewares/security/authentication');
const requireBodyData = require('@middlewares/body/data');
const requireBodyDataArray = require('@middlewares/body/dataArray');
const requireBodyDataObject = require('@middlewares/body/dataObject');
const parseQuerySelection = require('@middlewares/selection');

// Controllers
const ctrlOAuth = require('@controllers/oauth.controller.js');

module.exports = (router) => {
  router.post(paths.PATH_TOKEN, requireAuthentication(), ctrlOAuth.getToken);
  router.post(paths.PATH_AUTHORIZE,requireAuthentication(),ctrlOAuth.authorize);
};