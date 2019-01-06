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
const ctrlEntries = require('@controllers/entries.controller.js');

module.exports = (router) => {
  router.get('/', requireAuthentication.accessToken({
    scope: "entries:read"
  }), parseQuerySelection, ctrlEntries.findMany);
  router.post('/', requireAuthentication.accessToken({
    scope: "entries:write"
  }), requireBodyDataObject, ctrlEntries.createOne);
  router.put('/', requireAuthentication.accessToken({
    scope: "entries:write"
  }), requireBodyDataArray, ctrlEntries.updateMany);
  router.delete('/', requireAuthentication.accessToken({
    scope: "entries:delete"
  }), ctrlEntries.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_ENTRY, requireAuthentication.accessToken({
    scope: "entries:read"
  }), ctrlEntries.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_ENTRY, requireAuthentication.accessToken({
    scope: "entries:write"
  }), requireBodyDataObject, ctrlEntries.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_ENTRY, requireAuthentication.accessToken({
    scope: "entries:delete"
  }), ctrlEntries.deleteOne);
};