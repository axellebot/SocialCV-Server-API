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
const ctrlPermissions = require('@controllers/permissions.controller.js');

module.exports = (router) => {
  router.get('/', hasPerms(perms.PERMISSION_SCOPE_PERMISSIONS, perms.PERMISSION_CRUD_READ), parseQuerySelection, ctrlPermissions.findMany);
  router.post('/', hasPerms(perms.PERMISSION_SCOPE_PERMISSIONS, perms.PERMISSION_CRUD_WRITE), requireBodyDataObject, ctrlPermissions.createOne);
  router.put('/', hasPerms(perms.PERMISSION_SCOPE_PERMISSIONS, perms.PERMISSION_CRUD_WRITE), requireBodyDataArray, ctrlPermissions.updateMany);
  router.delete('/', hasPerms(perms.PERMISSION_SCOPE_PERMISSIONS, perms.PERMISSION_CRUD_DELETE), ctrlPermissions.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_PERMISSION, hasPerms(perms.PERMISSION_SCOPE_PERMISSIONS, perms.PERMISSION_CRUD_READ), ctrlPermissions.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_PERMISSION, hasPerms(perms.PERMISSION_SCOPE_PERMISSIONS, perms.PERMISSION_CRUD_WRITE), requireBodyDataObject, ctrlPermissions.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_PERMISSION, hasPerms(perms.PERMISSION_SCOPE_PERMISSIONS, perms.PERMISSION_CRUD_DELETE), ctrlPermissions.deleteOne);
};