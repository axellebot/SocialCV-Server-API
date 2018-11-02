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
const ctrlProfiles = require('@controllers/profiles.controller.js');

module.exports = (router) => {
  router.get('/', hasPerms(perms.PERMISSION_SCOPE_PROFILES, perms.PERMISSION_ACTION_READ),parseQuerySelection, ctrlProfiles.findMany);
  router.post('/', hasPerms(perms.PERMISSION_SCOPE_PROFILES, perms.PERMISSION_ACTION_CREATE), requireBodyDataObject, ctrlProfiles.createOne);
  router.put('/', hasPerms(perms.PERMISSION_SCOPE_PROFILES, perms.PERMISSION_ACTION_UPDATE), requireBodyDataArray, ctrlProfiles.updateMany);
  router.delete('/', hasPerms(perms.PERMISSION_SCOPE_PROFILES, perms.PERMISSION_ACTION_DELETE), ctrlProfiles.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_PROFILE, hasPerms(perms.PERMISSION_SCOPE_PROFILES, perms.PERMISSION_ACTION_READ),ctrlProfiles.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_PROFILE, hasPerms(perms.PERMISSION_SCOPE_PROFILES, perms.PERMISSION_ACTION_UPDATE), requireBodyDataObject, ctrlProfiles.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_PROFILE, hasPerms(perms.PERMISSION_SCOPE_PROFILES, perms.PERMISSION_ACTION_DELETE), ctrlProfiles.deleteOne);
};