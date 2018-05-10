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
const controllerEntries = require('@controllers/entries.controller.js');

module.exports = (router) => {
  router.get('/', parseQuerySelection, controllerEntries.findMany);
  router.post('/', requireRole(roles.ROLE_MEMBER), requireBodyDataObject, controllerEntries.createOne);
  router.put('/', requireRole(roles.ROLE_ADMIN), requireBodyDataArray, controllerEntries.updateMany);
  router.delete('/', requireRole(roles.ROLE_ADMIN), controllerEntries.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_ENTRY, controllerEntries.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_ENTRY, requireRole(roles.ROLE_MEMBER), requireBodyDataObject, controllerEntries.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_ENTRY, requireRole(roles.ROLE_MEMBER), controllerEntries.deleteOne);
};