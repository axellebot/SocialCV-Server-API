"use strict";

// Constants
const parameters = require('@constants/parameters');
const paths = require('@constants/paths');

// Middlewares
const asyncHandler = require('@middlewares/asyncHandler');
const requireAuthentication = require('@middlewares/security/authentication');
const requireBodyData = require('@middlewares/body/data');
const requireBodyDataArray = require('@middlewares/body/dataArray');
const requireBodyDataObject = require('@middlewares/body/dataObject');
const parseQuerySelection = require('@middlewares/selection');

// Controllers
const ctrlAccount = require('@controllers/account.controller.js');
const ctrlProfiles = require('@controllers/profiles.controller.js');

module.exports = (router) => {
  router.get('/', requireAuthentication.user({scope:"account:read"}), ctrlAccount.findOne);

  router.get(paths.PATH_PROFILES, requireAuthentication.user({scope:"profiles:read"}), parseQuerySelection, ctrlAccount.filterProfilesOfOne, ctrlProfiles.findMany);
};