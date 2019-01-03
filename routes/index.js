"use strict";

// Require Packages
const express = require('express');

// Constants
const paths = require('@constants/paths');

// Controllers
const controllerIndex = require('@controllers/index.controller.js');

module.exports = (app) => {
  //= ========================
  // Index Routes
  //= ========================
  const routeIndex = express.Router();
  app.use(paths.PATH_INDEX, routeIndex);

  routeIndex.get('/', controllerIndex.get);
  routeIndex.post('/', controllerIndex.get);

  //= ========================
  // OAuth Routes
  //= ========================
  const routeOAuth = express.Router();
  app.use(paths.PATH_OAUTH, routeOAuth);
  require('@routes/oauth.routes.js')(routeOAuth);

  //= ========================
  // Auth Routes
  //= ========================
  const routeAuth = express.Router();
  app.use('', routeAuth);
  require('@routes/authentication.routes.js')(routeAuth);

  //= ========================
  // Accounts Routes
  //= ========================
  const routeAccount = express.Router();
  app.use(paths.PATH_ACCOUNT, routeAccount);
  require('@routes/account.routes.js')(routeAccount);

  //= ========================
  // Entries Routes
  //= ========================
  const routeEntries = express.Router();
  app.use(paths.PATH_ENTRIES, routeEntries);
  require('@routes/entries.routes.js')(routeEntries);

  //= ========================
  // Groups Routes
  //= ========================
  const routeGroups = express.Router();
  app.use(paths.PATH_GROUPS, routeGroups);
  require('@routes/groups.routes.js')(routeGroups);

  //= ========================
  // Parts Routes
  //= ========================
  const routeParts = express.Router();
  app.use(paths.PATH_PARTS, routeParts);
  require('@routes/parts.routes.js')(routeParts);

  //= ========================
  // Permissions Routes
  //= ========================
  const routePermissions = express.Router();
  app.use(paths.PATH_PERMISSION, routePermissions);
  require('@routes/permissions.routes.js')(routePermissions);

  //= ========================
  // Profiles Routes
  //= ========================
  const routeProfiles = express.Router();
  app.use(paths.PATH_PROFILES, routeProfiles);
  require('@routes/profiles.routes.js')(routeProfiles);

  //= ========================
  // User Routes
  //= ========================
  const routeUsers = express.Router();
  app.use(paths.PATH_USERS, routeUsers);
  require('@routes/users.routes.js')(routeUsers);
};