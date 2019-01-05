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
const ctrlProfiles = require('@controllers/profiles.controller.js');
const ctrlParts = require('@controllers/parts.controller.js');

module.exports = (router) => {
  router.get('/', requireAuthentication.user({
    scope: "profiles:read"
  }), parseQuerySelection, ctrlProfiles.findMany);
  router.post('/', requireAuthentication.user({
    scope: "profiles:write"
  }), requireBodyDataObject, ctrlProfiles.createOne);
  router.put('/', requireAuthentication.user({
    scope: "profiles:write"
  }), requireBodyDataArray, ctrlProfiles.updateMany);
  router.delete('/', requireAuthentication.user({
    scope: "profiles:delete"
  }), ctrlProfiles.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_PROFILE, requireAuthentication.user({
    scope: "profiles:read"
  }), ctrlProfiles.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_PROFILE, requireAuthentication.user({
    scope: "profiles:write"
  }), requireBodyDataObject, ctrlProfiles.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_PROFILE, requireAuthentication.user({
    scope: "profiles:delete"
  }), ctrlProfiles.deleteOne);

  router.get('/' + ':' + parameters.PARAM_ID_PROFILE + paths.PATH_PARTS, requireAuthentication.user({
    scope: "parts:read"
  }), parseQuerySelection, ctrlProfiles.filterPartsOfOne, ctrlParts.findMany);
};