"use strict";

// Constants
const parameters = require('@constants/parameters');
const paths = require('@constants/paths');
const roles = require('@constants/roles');

// Middlewares
const requireRole = require('@middlewares/security/authorization');
const requireAuthentication = require('@middlewares/security/authentication');
const requireBodyData = require('@middlewares/body/data');
const requireBodyDataArray = require('@middlewares/body/dataArray');
const requireBodyDataObject = require('@middlewares/body/dataObject');
const parseQuerySelection = require('@middlewares/selection');

// Controllers
const controllerParts = require('@controllers/parts.controller.js');

module.exports = (router) => {
  router.get('/', parseQuerySelection, controllerParts.findMany);
  router.post('/', requireRole(roles.ROLE_MEMBER), requireBodyDataObject, controllerParts.createOne);
  router.put('/', requireRole(roles.ROLE_ADMIN), requireBodyDataArray, controllerParts.updateMany);
  router.delete('/', requireRole(roles.ROLE_ADMIN), controllerParts.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_PART, controllerParts.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_PART, requireRole(roles.ROLE_ADMIN), requireBodyDataObject, controllerParts.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_PART, requireRole(roles.ROLE_ADMIN), controllerParts.deleteOne);
};