"use strict";

const express = require('express');

const requireRole = require('./middlewares/security/role'),
    requireBodyData = require('./middlewares/body/data'),
    requireBodyDataArray = require('./middlewares/body/dataArray'),
    requireBodyDataObject = require('./middlewares/body/dataObject'),
    parseQueryCursor = require('./middlewares/query/cursor'),
    parseQuerySelect = require('./middlewares/query/select'),
    parseQueryFilter = require('./middlewares/query/filter'),
    parseQuery = [parseQueryCursor, parseQuerySelect, parseQueryFilter];

// Controllers
const
    controllerIndex = require('./controllers/index'),
    controllerAuthentification = require('./controllers/authentication'),
    controllerEntries = require('./controllers/entries'),
    controllerGroups = require('./controllers/groups'),
    controllerParts = require('./controllers/parts'),
    controllerProfiles = require('./controllers/profiles'),
    controllerUsers = require('./controllers/users');

// Routes
const
    routeIndex = express.Router(),
    routeAuth = express.Router(),
    routeEntries = express.Router(),
    routeGroups = express.Router(),
    routeParts = express.Router(),
    routeProfiles = express.Router(),
    routeUsers = express.Router();

module.exports = function (app) {

    //= ========================
    // Index Routes
    //= ========================

    app.use(PATH_INDEX, routeIndex);

    routeIndex.get('/', controllerIndex.get);

    //= ========================
    // Auth Routes
    //= ========================

    app.use(PATH_AUTHENTICATION, routeAuth);

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