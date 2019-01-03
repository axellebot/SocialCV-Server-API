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
const ctrlGroups = require('@controllers/groups.controller.js');
const ctrlEntries = require('@controllers/entries.controller.js');

module.exports = (router) => {
  router.get('/', requireAuthentication.user({
    scope: "groups:read"
  }), hasPerms(perms.PERMISSION_SCOPE_GROUPS, perms.PERMISSION_ACTION_READ), parseQuerySelection, ctrlGroups.findMany);
  router.post('/', requireAuthentication.user({
    scope: "groups:write"
  }), hasPerms(perms.PERMISSION_SCOPE_GROUPS, perms.PERMISSION_ACTION_CREATE), requireBodyDataObject, ctrlGroups.createOne);
  router.put('/', requireAuthentication.user({
    scope: "groups:write"
  }), hasPerms(perms.PERMISSION_SCOPE_GROUPS, perms.PERMISSION_ACTION_UPDATE), requireBodyDataArray, ctrlGroups.updateMany);
  router.delete('/', requireAuthentication.user({
    scope: "groups:delete"
  }), hasPerms(perms.PERMISSION_SCOPE_GROUPS, perms.PERMISSION_ACTION_DELETE), ctrlGroups.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_GROUP, requireAuthentication.user({
    scope: "groups:write"
  }), hasPerms(perms.PERMISSION_SCOPE_GROUPS, perms.PERMISSION_ACTION_READ), ctrlGroups.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_GROUP, requireAuthentication.user({
    scope: "groups:write"
  }), hasPerms(perms.PERMISSION_SCOPE_GROUPS, perms.PERMISSION_ACTION_UPDATE), requireBodyDataObject, ctrlGroups.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_GROUP, requireAuthentication.user({
    scope: "groups:delete"
  }), hasPerms(perms.PERMISSION_SCOPE_GROUPS, perms.PERMISSION_ACTION_DELETE), ctrlGroups.deleteOne);

  router.get('/' + ':' + parameters.PARAM_ID_GROUP + paths.PATH_ENTRIES, requireAuthentication.user({
    scope: "entries:read"
  }), hasPerms(perms.PERMISSION_SCOPE_GROUPS, perms.PERMISSION_ACTION_READ), parseQuerySelection, ctrlGroups.filterEntriesOfOne, hasPerms(perms.PERMISSION_SCOPE_ENTRIES, perms.PERMISSION_ACTION_READ), ctrlEntries.findMany);
};