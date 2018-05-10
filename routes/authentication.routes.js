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
const controllerAuthentication = require('../controllers/authentication.controller.js');

module.exports = (router) => {
  router.post(paths.PATH_REGISTER, controllerAuthentication.register);
  router.post(paths.PATH_LOGIN, controllerAuthentication.login);
};