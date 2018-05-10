"use strict";

// Require Packages
const express = require('express');

// Constants
const paths = require('../constants/paths');

// Controllers
const controllerIndex = require('../controllers/index.controller.js');

module.exports = (app) => {
  //= ========================
  // Index Routes
  //= ========================
  const routeIndex = express.Router();
  app.use(paths.PATH_INDEX, routeIndex);
  
  routeIndex.get('/', controllerIndex.get);

  //= ========================
  // Auth Routes
  //= ========================
  const routeAuth = express.Router();
  app.use(paths.PATH_AUTHENTICATION, routeAuth);
  require('./authentication.routes.js')(routeAuth);

  //= ========================
  // Entries Routes
  //= ========================
  const routeEntries = express.Router();
  app.use(paths.PATH_ENTRIES, routeEntries);
  require('./entries.routes.js')(routeEntries);

  //= ========================
  // Groups Routes
  //= ========================
  const routeGroups = express.Router();
  app.use(paths.PATH_GROUPS, routeGroups);
  require('./groups.routes.js')(routeGroups);

  //= ========================
  // Parts Routes
  //= ========================
  const routeParts = express.Router();
  app.use(paths.PATH_PARTS, routeParts);
  require('./parts.routes.js')(routeParts);

  //= ========================
  // Profiles Routes
  //= ========================
  const routeProfiles = express.Router();
  app.use(paths.PATH_PROFILES, routeProfiles);
  require('./profiles.routes.js')(routeProfiles);

  //= ========================
  // User Routes
  //= ========================
  const routeUsers = express.Router();
  app.use(paths.PATH_USERS, routeUsers);
  require('./users.routes.js')(routeUsers);
};