"use strict";

// Constants
const parameters = require('@constants/parameters');
const paths = require('@constants/paths');
const perms = require('@constants/permissions');

// Middlewares
const authenticate = require('@middlewares/security/authentication');
const requireBodyData = require('@middlewares/body/data');
const requireBodyDataArray = require('@middlewares/body/dataArray');
const requireBodyDataObject = require('@middlewares/body/dataObject');
const parseQuerySelection = require('@middlewares/selection');

// Controllers
const ctrlUsers = require('@controllers/users.controller.js');

module.exports = (router) => {
  router.get('/', authenticate({
    scopes: ["users:read"]
  }), parseQuerySelection, ctrlUsers.findMany);
  router.post('/', authenticate({
    scopes: ["users:write"]
  }), requireBodyDataObject, ctrlUsers.createOne);
  router.put('/', authenticate({
    scopes: ["users:write"]
  }), requireBodyDataArray, ctrlUsers.updateMany);
  router.delete('/', authenticate({
    scopes: ["users:delete"]
  }), ctrlUsers.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_USER, authenticate({
    scopes: ["users:read"]
  }), ctrlUsers.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_USER, authenticate({
    scopes: ["users:write"]
  }), requireBodyDataObject, ctrlUsers.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_USER, authenticate({
    scopes: ["users:delete"]
  }), ctrlUsers.deleteOne);
};