"use strict";

// Constants
const parameters = require('@constants/parameters');
const paths = require('@constants/paths');
const perms = require('@constants/permissions');

// Middlewares
const requireAuthentication = require('@middlewares/security/authentication');
const requireBodyData = require('@middlewares/body/data');
const requireBodyDataArray = require('@middlewares/body/dataArray');
const requireBodyDataObject = require('@middlewares/body/dataObject');
const parseQuerySelection = require('@middlewares/selection');

// Controllers
const ctrlPermissions = require('@controllers/permissions.controller.js');

module.exports = (router) => {
  router.get('/', requireAuthentication.user({
    scope: "permissions:read"
  }), parseQuerySelection, ctrlPermissions.findMany);
  router.post('/', requireAuthentication.user({
    scope: "permissions:write"
  }), requireBodyDataObject, ctrlPermissions.createOne);
  router.put('/', requireAuthentication.user({
    scope: "permissions:write"
  }), requireBodyDataArray, ctrlPermissions.updateMany);
  router.delete('/', requireAuthentication.user({
    scope: "permissions:delete"
  }), ctrlPermissions.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_PERMISSION, requireAuthentication.user({
    scope: "permissions:read"
  }), ctrlPermissions.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_PERMISSION, requireAuthentication.user({
    scope: "permissions:write"
  }), requireBodyDataObject, ctrlPermissions.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_PERMISSION, requireAuthentication.user({
    scope: "permissions:delete"
  }), ctrlPermissions.deleteOne);
};