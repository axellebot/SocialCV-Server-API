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
const ctrlUsers = require('@controllers/users.controller.js');

module.exports = (router) => {
  router.get('/', hasPerms(perms.PERMISSION_SCOPE_USERS, perms.PERMISSION_ACTION_READ), parseQuerySelection, ctrlUsers.findMany);
  router.post('/', hasPerms(perms.PERMISSION_SCOPE_USERS, perms.PERMISSION_ACTION_CREATE), requireBodyDataObject, ctrlUsers.createOne);
  router.put('/', hasPerms(perms.PERMISSION_SCOPE_USERS, perms.PERMISSION_ACTION_UPDATE), requireBodyDataArray, ctrlUsers.updateMany);
  router.delete('/', hasPerms(perms.PERMISSION_SCOPE_USERS, perms.PERMISSION_ACTION_DELETE), ctrlUsers.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_USER, hasPerms(perms.PERMISSION_SCOPE_USERS, perms.PERMISSION_ACTION_READ), ctrlUsers.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_USER, hasPerms(perms.PERMISSION_SCOPE_USERS, perms.PERMISSION_ACTION_UPDATE), requireBodyDataObject, ctrlUsers.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_USER, hasPerms(perms.PERMISSION_SCOPE_USERS, perms.PERMISSION_ACTION_DELETE), ctrlUsers.deleteOne);
};