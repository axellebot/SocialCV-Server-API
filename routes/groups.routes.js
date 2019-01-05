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
const ctrlGroups = require('@controllers/groups.controller.js');
const ctrlEntries = require('@controllers/entries.controller.js');

module.exports = (router) => {
  router.get('/', requireAuthentication.user({
    scope: "groups:read"
  }), parseQuerySelection, ctrlGroups.findMany);
  router.post('/', requireAuthentication.user({
    scope: "groups:write"
  }), requireBodyDataObject, ctrlGroups.createOne);
  router.put('/', requireAuthentication.user({
    scope: "groups:write"
  }), requireBodyDataArray, ctrlGroups.updateMany);
  router.delete('/', requireAuthentication.user({
    scope: "groups:delete"
  }), ctrlGroups.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_GROUP, requireAuthentication.user({
    scope: "groups:write"
  }), ctrlGroups.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_GROUP, requireAuthentication.user({
    scope: "groups:write"
  }), requireBodyDataObject, ctrlGroups.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_GROUP, requireAuthentication.user({
    scope: "groups:delete"
  }), ctrlGroups.deleteOne);

  router.get('/' + ':' + parameters.PARAM_ID_GROUP + paths.PATH_ENTRIES, requireAuthentication.user({
    scope: "entries:read"
  }), parseQuerySelection, ctrlGroups.filterEntriesOfOne, ctrlEntries.findMany);
};