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
const ctrlParts = require('@controllers/parts.controller.js');
const ctrlGroups = require('@controllers/groups.controller.js');

module.exports = (router) => {
  router.get('/', hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_ACTION_READ), parseQuerySelection, ctrlParts.findMany);
  router.post('/', hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_ACTION_CREATE), requireBodyDataObject, ctrlParts.createOne);
  router.put('/', hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_ACTION_UPDATE), requireBodyDataArray, ctrlParts.updateMany);
  router.delete('/', hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_ACTION_DELETE), ctrlParts.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_PART, hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_ACTION_READ), ctrlParts.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_PART, hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_ACTION_UPDATE), requireBodyDataObject, ctrlParts.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_PART, hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_ACTION_DELETE), ctrlParts.deleteOne);

  router.get('/' + ':' + parameters.PARAM_ID_PART + paths.PATH_GROUPS, hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_ACTION_READ), parseQuerySelection, ctrlParts.filterGroupsOfOne, hasPerms(perms.PERMISSION_SCOPE_GROUPS, perms.PERMISSION_ACTION_READ), ctrlGroups.findMany);
};