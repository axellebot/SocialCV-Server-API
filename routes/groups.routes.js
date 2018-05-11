"use strict";

// Constants
const parameters = require('@constants/parameters');
const paths = require('@constants/paths');
const perms = require('@constants/permissions');

// Middlewares
const hasPerms = require('@middlewares/security/RBAC');
const requireAuthentication = require('@middlewares/security/authentication');
const requireBodyData = require('@middlewares/body/data');
const requireBodyDataArray = require('@middlewares/body/dataArray');
const requireBodyDataObject = require('@middlewares/body/dataObject');
const parseQuerySelection = require('@middlewares/selection');

// Controllers
const controllerGroups = require('@controllers/groups.controller.js');

module.exports = (router) => {
  router.get('/', hasPerms(perms.PERMISSION_SCOPE_GROUPS,perms.PERMISSION_CRUD_READ),parseQuerySelection, controllerGroups.findMany);
  router.post('/', hasPerms(perms.PERMISSION_SCOPE_GROUPS,perms.PERMISSION_CRUD_WRITE), requireBodyDataObject, controllerGroups.createOne);
  router.put('/', hasPerms(perms.PERMISSION_SCOPE_GROUPS,perms.PERMISSION_CRUD_WRITE), requireBodyDataArray, controllerGroups.updateMany);
  router.delete('/', hasPerms(perms.PERMISSION_SCOPE_GROUPS,perms.PERMISSION_CRUD_DELETE), controllerGroups.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_GROUP,  hasPerms(perms.PERMISSION_SCOPE_GROUPS,perms.PERMISSION_CRUD_READ),controllerGroups.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_GROUP,  hasPerms(perms.PERMISSION_SCOPE_GROUPS,perms.PERMISSION_CRUD_WRITE), requireBodyDataObject, controllerGroups.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_GROUP, hasPerms(perms.PERMISSION_SCOPE_GROUPS,perms.PERMISSION_CRUD_DELETE), controllerGroups.deleteOne);
};