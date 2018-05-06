"use strict";

const express = require('express');

// Constants
const messages = require('./constants/messages');
const statuses = require('./constants/statuses');
const models = require('./constants/models');
const collections = require('./constants/collections');
const roles = require('./constants/roles');
const parameters = require('./constants/parameters');
const paths = require('./constants/paths');

// Middlewares
const requireRole = require('./middlewares/security/role');
const requireBodyData = require('./middlewares/body/data');
const requireBodyDataArray = require('./middlewares/body/dataArray');
const requireBodyDataObject = require('./middlewares/body/dataObject');
const parseQueryCursor = require('./middlewares/query/cursor');
const parseQuerySelect = require('./middlewares/query/select');
const parseQueryFilter = require('./middlewares/query/filter');
const parseQuery = [parseQueryCursor, parseQuerySelect, parseQueryFilter];

// Controllers
const controllerIndex = require('./controllers/index');
const controllerAuthentification = require('./controllers/authentication');
const controllerEntries = require('./controllers/entries');
const controllerGroups = require('./controllers/groups');
const controllerParts = require('./controllers/parts');
const controllerProfiles = require('./controllers/profiles');
const controllerUsers = require('./controllers/users');

// Routes
const routeIndex = express.Router();
const routeAuth = express.Router();
const routeEntries = express.Router();
const routeGroups = express.Router();
const routeParts = express.Router();
const routeProfiles = express.Router();
const routeUsers = express.Router();

// Paths
const PATH_INDEX = paths.PATH_INDEX;
const PATH_AUTHENTICATION = paths.PATH_AUTHENTICATION;
const PATH_LOGIN = paths.PATH_LOGIN;
const PATH_REGISTER = paths.PATH_REGISTER;
const PATH_ENTRIES = paths.PATH_ENTRIES;
const PATH_GROUPS = paths.PATH_GROUPS;
const PATH_PARTS = paths.PATH_PARTS;
const PATH_PROFILES = paths.PATH_PROFILES;
const PATH_USERS = paths.PATH_USERS;

// Parameters
const PARAM_ID_ENTRY = parameters.PARAM_ID_ENTRY;
const PARAM_ID_GROUP = parameters.PARAM_ID_GROUP;
const PARAM_ID_PART = parameters.PARAM_ID_PART;
const PARAM_ID_PROFILE = parameters.PARAM_ID_PROFILE;
const PARAM_ID_USER = parameters.PARAM_ID_USER;

// Roels
const ROLE_ADMIN = roles.ROLE_ADMIN;
const ROLE_MEMBER = roles.ROLE_MEMBER;

module.exports = function(app) {

  //= ========================
  // Index Routes
  //= ========================

  app.use(paths.PATH_INDEX, routeIndex);

  routeIndex.get('/', controllerIndex.get);

  //= ========================
  // Auth Routes
  //= ========================

  app.use(paths.PATH_AUTHENTICATION, routeAuth);
  
  routeAuth.post(PATH_REGISTER, controllerAuthentification.register.post);
  routeAuth.post(PATH_LOGIN, controllerAuthentification.login.post);

  //= ========================
  // Entries Routes
  //= ========================

  app.use(PATH_ENTRIES, routeEntries);

  routeEntries.get(PATH_INDEX, parseQuery, controllerEntries.entries.get);
  routeEntries.post(PATH_INDEX, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerEntries.entries.post);
  routeEntries.put(PATH_INDEX, requireRole(ROLE_MEMBER), requireBodyDataArray, controllerEntries.entries.put);
  routeEntries.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerEntries.entries.delete);

  routeEntries.get(PATH_INDEX + ':' + PARAM_ID_ENTRY, controllerEntries.entry.get);
  routeEntries.put(PATH_INDEX + ':' + PARAM_ID_ENTRY, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerEntries.entry.put);
  routeEntries.delete(PATH_INDEX + ':' + PARAM_ID_ENTRY, requireRole(ROLE_MEMBER), controllerEntries.entry.delete);

  //= ========================
  // Groups Routes
  //= ========================

  app.use(PATH_GROUPS, routeGroups);

  routeGroups.get(PATH_INDEX, parseQuery, controllerGroups.groups.get);
  routeGroups.post(PATH_INDEX, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerGroups.groups.post);
  routeGroups.put(PATH_INDEX, requireRole(ROLE_MEMBER), requireBodyDataArray, controllerGroups.groups.put);
  routeGroups.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerGroups.groups.delete);

  routeGroups.get(PATH_INDEX + ':' + PARAM_ID_ENTRY, controllerGroups.group.get);
  routeGroups.put(PATH_INDEX + ':' + PARAM_ID_ENTRY, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerGroups.group.put);
  routeGroups.delete(PATH_INDEX + ':' + PARAM_ID_ENTRY, requireRole(ROLE_MEMBER), controllerGroups.group.delete);

  //= ========================
  // Parts Routes
  //= ========================

  app.use(PATH_PARTS, routeParts);

  routeParts.get(PATH_INDEX, parseQuery, controllerParts.parts.get);
  routeParts.post(PATH_INDEX, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerParts.parts.post);
  routeParts.put(PATH_INDEX, requireRole(ROLE_MEMBER), requireBodyDataArray, controllerParts.parts.put);
  routeParts.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerParts.parts.delete);

  routeParts.get(PATH_INDEX + ':' + PARAM_ID_PART, controllerParts.part.get);
  routeParts.put(PATH_INDEX + ':' + PARAM_ID_PART, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerParts.part.put);
  routeParts.delete(PATH_INDEX + ':' + PARAM_ID_PART, requireRole(ROLE_MEMBER), controllerParts.part.delete);

  //= ========================
  // Profiles Routes
  //= ========================

  app.use(PATH_PROFILES, routeProfiles);

  routeProfiles.get(PATH_INDEX, parseQuery, controllerProfiles.profiles.get);
  routeProfiles.post(PATH_INDEX, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerProfiles.profiles.post);
  routeProfiles.put(PATH_INDEX, requireRole(ROLE_MEMBER), requireBodyDataArray, controllerProfiles.profiles.put);
  routeProfiles.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerProfiles.profiles.delete);

  routeProfiles.get(PATH_INDEX + ':' + PARAM_ID_PROFILE, controllerProfiles.profile.get);
  routeProfiles.put(PATH_INDEX + ':' + PARAM_ID_PROFILE, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerProfiles.profile.put);
  routeProfiles.delete(PATH_INDEX + ':' + PARAM_ID_PROFILE, requireRole(ROLE_MEMBER), controllerProfiles.profile.delete);

  //= ========================
  // User Routes
  //= ========================

  app.use(PATH_USERS, routeUsers);

  routeUsers.get(PATH_INDEX, requireRole(ROLE_ADMIN), parseQuery, controllerUsers.users.get);
  routeUsers.post(PATH_INDEX, requireRole(ROLE_ADMIN), requireBodyDataObject, controllerUsers.users.post);
  routeUsers.put(PATH_INDEX, requireRole(ROLE_ADMIN), requireBodyDataArray, controllerUsers.users.put);
  routeUsers.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerUsers.users.delete);

  routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER, requireRole(ROLE_MEMBER), controllerUsers.user.get);
  routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerUsers.user.put);
  routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER, requireRole(ROLE_MEMBER), controllerUsers.user.delete);

  //Entries Routes
  routeEntries.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTRIES, parseQuery, controllerUsers.user.entries.get);
  routeEntries.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTRIES, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerUsers.user.entries.post);
  routeEntries.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTRIES, requireRole(ROLE_MEMBER), requireBodyDataArray, controllerUsers.user.entries.put);
  routeEntries.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTRIES, requireRole(ROLE_MEMBER), controllerUsers.user.entries.delete);

  //Groups Routes
  routeGroups.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_GROUPS, parseQuery, controllerUsers.user.groups.get);
  routeGroups.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_GROUPS, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerUsers.user.groups.post);
  routeGroups.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_GROUPS, requireRole(ROLE_MEMBER), requireBodyDataArray, controllerUsers.user.groups.put);
  routeGroups.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_GROUPS, requireRole(ROLE_MEMBER), controllerUsers.user.groups.delete);

  //Parts Routes
  routeParts.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PARTS, parseQuery, controllerUsers.user.parts.get);
  routeParts.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PARTS, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerUsers.user.parts.post);
  routeParts.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PARTS, requireRole(ROLE_MEMBER), requireBodyDataArray, controllerUsers.user.parts.put);
  routeParts.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PARTS, requireRole(ROLE_MEMBER), controllerUsers.user.parts.delete);

  //Profiles Routes
  routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, parseQuery, controllerUsers.user.profiles.get);
  routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, requireRole(ROLE_MEMBER), requireBodyDataObject, controllerUsers.user.profiles.post);
  routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, requireRole(ROLE_MEMBER), requireBodyDataArray, controllerUsers.user.profiles.put);
  routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, requireRole(ROLE_MEMBER), controllerUsers.user.profiles.delete);
};