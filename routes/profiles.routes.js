"use strict";

// Constants
const parameters = require('../constants/parameters');
const paths = require('../constants/paths');
const roles = require('../constants/roles');

// Middlewares
const requireRole = require('../middlewares/security/authorization');
const requireAuthentication = require('../middlewares/security/authentication');
const requireBodyData = require('../middlewares/body/data');
const requireBodyDataArray = require('../middlewares/body/dataArray');
const requireBodyDataObject = require('../middlewares/body/dataObject');
const parseQuerySelection = require('../middlewares/selection');

// Controllers
const controllerProfiles = require('../controllers/profiles.controller.js');

module.exports = (router) => {
  router.get('/', parseQuerySelection, controllerProfiles.findMany);
  router.post('/', requireRole(roles.ROLE_MEMBER), requireBodyDataObject, controllerProfiles.createOne);
  router.put('/', requireRole(roles.ROLE_ADMIN), requireBodyDataArray, controllerProfiles.updateMany);
  router.delete('/', requireRole(roles.ROLE_ADMIN), controllerProfiles.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_PROFILE, controllerProfiles.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_PROFILE, requireRole(roles.ROLE_ADMIN), requireBodyDataObject, controllerProfiles.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_PROFILE, requireRole(roles.ROLE_ADMIN), controllerProfiles.deleteOne);
};