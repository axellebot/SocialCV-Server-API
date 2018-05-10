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
const controllerGroups = require('@controllers/groups.controller.js');

module.exports = (router) => {
  router.get('/', parseQuerySelection, controllerGroups.findMany);
  router.post('/', requireRole(roles.ROLE_MEMBER), requireBodyDataObject, controllerGroups.createOne);
  router.put('/', requireRole(roles.ROLE_ADMIN), requireBodyDataArray, controllerGroups.updateMany);
  router.delete('/', requireRole(roles.ROLE_ADMIN), controllerGroups.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_GROUP, controllerGroups.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_GROUP, requireRole(roles.ROLE_ADMIN), requireBodyDataObject, controllerGroups.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_GROUP, requireRole(roles.ROLE_ADMIN), controllerGroups.deleteOne);
};