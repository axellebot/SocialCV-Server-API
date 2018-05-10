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
const controllerUsers = require('@controllers/profiles.controller.js');

module.exports = (router) => {
  router.get('/', requireRole(roles.ROLE_ADMIN), parseQuerySelection, controllerUsers.findMany);
  router.post('/', requireRole(roles.ROLE_ADMIN), requireBodyDataObject, controllerUsers.createOne);
  router.put('/', requireRole(roles.ROLE_ADMIN), requireBodyDataArray, controllerUsers.updateMany);
  router.delete('/', requireRole(roles.ROLE_ADMIN), controllerUsers.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_USER, requireRole(roles.ROLE_ADMIN), controllerUsers.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_USER, requireRole(roles.ROLE_ADMIN), requireBodyDataObject, controllerUsers.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_USER, requireRole(roles.ROLE_ADMIN), controllerUsers.deleteOne);
};