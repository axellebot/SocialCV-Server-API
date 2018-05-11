"use strict";

// Constants
const parameters = require('@constants/parameters');
const paths = require('@constants/paths');
const roles = require('@constants/roles');

// Middlewares
const requireRole = require('@middlewares/security/authorization');
const requireAuthentication = require('@middlewares/security/authentication');
const requireBodyData = require('@middlewares/body/data');
const requireBodyDataArray = require('@middlewares/body/dataArray');
const requireBodyDataObject = require('@middlewares/body/dataObject');
const parseQuerySelection = require('@middlewares/selection');

// Controllers
const ctrlPermissions = require('@controllers/permissions.controller.js');

module.exports = (router) => {
  router.get('/', parseQuerySelection, ctrlPermissions.findMany);
  router.post('/', requireRole(roles.ROLE_MEMBER), requireBodyDataObject, ctrlPermissions.createOne);
  router.put('/', requireRole(roles.ROLE_ADMIN), requireBodyDataArray, ctrlPermissions.updateMany);
  router.delete('/', requireRole(roles.ROLE_ADMIN), ctrlPermissions.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_PERMISSION, ctrlPermissions.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_PERMISSION, requireRole(roles.ROLE_ADMIN), requireBodyDataObject, ctrlPermissions.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_PERMISSION, requireRole(roles.ROLE_ADMIN), ctrlPermissions.deleteOne);
};