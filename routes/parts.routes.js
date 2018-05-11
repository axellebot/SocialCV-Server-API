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
const ctrlParts = require('@controllers/parts.controller.js');

module.exports = (router) => {
  router.get('/', hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_CRUD_READ), parseQuerySelection, ctrlParts.findMany);
  router.post('/', hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_CRUD_WRITE), requireBodyDataObject, ctrlParts.createOne);
  router.put('/', hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_CRUD_WRITE), requireBodyDataArray, ctrlParts.updateMany);
  router.delete('/', hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_CRUD_DELETE), ctrlParts.deleteAll);

  router.get('/' + ':' + parameters.PARAM_ID_PART, hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_CRUD_READ), ctrlParts.findOne);
  router.put('/' + ':' + parameters.PARAM_ID_PART, hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_CRUD_WRITE), requireBodyDataObject, ctrlParts.updateOne);
  router.delete('/' + ':' + parameters.PARAM_ID_PART, hasPerms(perms.PERMISSION_SCOPE_PARTS, perms.PERMISSION_CRUD_DELETE), ctrlParts.deleteOne);
};