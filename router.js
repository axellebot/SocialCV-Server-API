"use strict";

const express = require('express');

const requireAuthentication = require('./middlewares/requireAuthentication');
const requireRole = require('./middlewares/requireRole');
const requireUserOwner = require('./middlewares/requireUserOwner');

// Roles
const
    ROLE_MEMBER = global.constants.ROLE.ROLE_MEMBER,
    ROLE_ADMIN = global.constants.ROLE.ROLE_ADMIN;

// Route Paths
const PATH_INDEX = global.constants.PATH.PATH_INDEX,
    PATH_AUTHENTICATION = global.constants.PATH.PATH_AUTHENTICATION,
    PATH_REGISTER = global.constants.PATH.PATH_REGISTER,
    PATH_LOGIN = global.constants.PATH.PATH_LOGIN,
    PATH_COMPUTING_TAGS = global.constants.PATH.PATH_COMPUTING_TAGS,
    PATH_EDUCATIONS = global.constants.PATH.PATH_EDUCATIONS,
    PATH_ENTITIES = global.constants.PATH.PATH_ENTITIES,
    PATH_EXPERIENCES = global.constants.PATH.PATH_EXPERIENCES,
    PATH_FRAMEWORKS = global.constants.PATH.PATH_FRAMEWORKS,
    PATH_FRAMEWORK_TAGS = global.constants.PATH.PATH_FRAMEWORK_TAGS,
    PATH_INTERESTS = global.constants.PATH.PATH_INTERESTS,
    PATH_LANGUAGES = global.constants.PATH.PATH_LANGUAGES,
    PATH_LINKS = global.constants.PATH.PATH_LINKS,
    PATH_LINK_TAGS = global.constants.PATH.PATH_LINK_TAGS,
    PATH_OPERATING_SYSTEMS = global.constants.PATH.PATH_OPERATING_SYSTEMS,
    PATH_PROFILES = global.constants.PATH.PATH_PROFILES,
    PATH_PROGRAMMING_LANGUAGES = global.constants.PATH.PATH_PROGRAMMING_LANGUAGES,
    PATH_PROJECTS = global.constants.PATH.PATH_PROJECTS,
    PATH_PROJECT_TAGS = global.constants.PATH.PATH_PROJECT_TAGS,
    PATH_SOFTWARE_FRAMEWORKS = global.constants.PATH.PATH_SOFTWARE_FRAMEWORKS,
    PATH_SOFTWARES = global.constants.PATH.PATH_SOFTWARES,
    PATH_SOFTWARE_TAGS = global.constants.PATH.PATH_SOFTWARE_TAGS,
    PATH_USERS = global.constants.PATH.PATH_USERS;

// Parametre Ids
const PARAM_ID_COMPUTING_TAG = global.constants.PARAM.PARAM_ID_COMPUTING_TAG,
    PARAM_ID_EDUCATION = global.constants.PARAM.PARAM_ID_EDUCATION,
    PARAM_ID_ENTITY = global.constants.PARAM.PARAM_ID_ENTITY,
    PARAM_ID_EXPERIENCE = global.constants.PARAM.PARAM_ID_EXPERIENCE,
    PARAM_ID_FRAMEWORK = global.constants.PARAM.PARAM_ID_FRAMEWORK,
    PARAM_ID_FRAMEWORK_TAG = global.constants.PARAM.PARAM_ID_FRAMEWORK_TAG,
    PARAM_ID_INTEREST = global.constants.PARAM.PARAM_ID_INTEREST,
    PARAM_ID_LANGUAGE = global.constants.PARAM.PARAM_ID_LANGUAGE,
    PARAM_ID_LINK = global.constants.PARAM.PARAM_ID_LINK,
    PARAM_ID_LINK_TAG = global.constants.PARAM.PARAM_ID_LINK_TAG,
    PARAM_ID_OPERATING_SYSTEM = global.constants.PARAM.PARAM_ID_OPERATING_SYSTEM,
    PARAM_ID_PROFILE = global.constants.PARAM.PARAM_ID_PROFILE,
    PARAM_ID_PROGRAMMING_LANGUAGE = global.constants.PARAM.PARAM_ID_PROGRAMMING_LANGUAGE,
    PARAM_ID_PROJECT = global.constants.PARAM.PARAM_ID_PROJECT,
    PARAM_ID_PROJECT_TAG = global.constants.PARAM.PARAM_ID_PROJECT_TAG,
    PARAM_ID_SOFTWARE_FRAMEWORK = global.constants.PARAM.PARAM_ID_SOFTWARE_FRAMEWORK,
    PARAM_ID_SOFTWARE = global.constants.PARAM.PARAM_ID_SOFTWARE,
    PARAM_ID_SOFTWARE_TAG = global.constants.PARAM.PARAM_ID_SOFTWARE_TAG,
    PARAM_ID_USER = global.constants.PARAM.PARAM_ID_USER;

// Controllers
const
    controllerIndex = require('./controllers/index'),
    controllerAuthentification = require('./controllers/authentication'),
    controllerComputingTags = require('./controllers/computingTags'),
    controllerEducations = require('./controllers/educations'),
    controllerEntities = require('./controllers/entities'),
    controllerExperiences = require('./controllers/experiences'),
    controllerFrameworks = require('./controllers/frameworks'),
    controllerFrameworkTags = require('./controllers/frameworkTags'),
    controllerInterests = require('./controllers/interests'),
    controllerLanguages = require('./controllers/languages'),
    controllerLinks = require('./controllers/links'),
    controllerLinkTags = require('./controllers/linkTags'),
    controllerOperatingSystems = require('./controllers/operatingSystems'),
    controllerProfiles = require('./controllers/profiles'),
    controllerProgrammingLanguages = require('./controllers/programmingLanguages'),
    controllerProjects = require('./controllers/projects'),
    controllerProjectTags = require('./controllers/projectTags'),
    controllerSoftwareFrameworks = require('./controllers/softwareFrameworks'),
    controllerSoftwares = require('./controllers/softwares'),
    controllerSoftwareTags = require('./controllers/softwareTags'),
    controllerUsers = require('./controllers/users');

// Routes
const
    routeIndex = express.Router(),
    routeAuth = express.Router(),
    routeComputingTags = express.Router(),
    routeEducations = express.Router(),
    routeEntities = express.Router(),
    routeExperiences = express.Router(),
    routeFrameworks = express.Router(),
    routeFrameworkTags = express.Router(),
    routeInterests = express.Router(),
    routeLanguages = express.Router(),
    routeLinks = express.Router(),
    routeLinkTags = express.Router(),
    routeOperatingSystems = express.Router(),
    routeProfiles = express.Router(),
    routeProgrammingLanguages = express.Router(),
    routeProjects = express.Router(),
    routeProjectTags = express.Router(),
    routeSoftwareFrameworks = express.Router(),
    routeSoftwares = express.Router(),
    routeSoftwareTags = express.Router(),
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
    // Computing Tag Routes
    //= ========================

    app.use(PATH_COMPUTING_TAGS, routeComputingTags);

    routeComputingTags.get(PATH_INDEX, controllerComputingTags.computingTags.get);
    routeComputingTags.post(PATH_INDEX, requireAuthentication, controllerComputingTags.computingTags.post);
    routeComputingTags.put(PATH_INDEX, requireAuthentication, controllerComputingTags.computingTags.put);
    routeComputingTags.delete(PATH_INDEX, requireAuthentication, controllerComputingTags.computingTags.delete);
    routeComputingTags.get(PATH_INDEX + ':' + PARAM_ID_COMPUTING_TAG, controllerComputingTags.computingTag.get);
    routeComputingTags.post(PATH_INDEX + ':' + PARAM_ID_COMPUTING_TAG, requireAuthentication, controllerComputingTags.computingTag.post);
    routeComputingTags.put(PATH_INDEX + ':' + PARAM_ID_COMPUTING_TAG, requireAuthentication, controllerComputingTags.computingTag.put);
    routeComputingTags.delete(PATH_INDEX + ':' + PARAM_ID_COMPUTING_TAG, requireAuthentication, controllerComputingTags.computingTag.delete);

    //= ========================
    // Education Routes
    //= ========================

    app.use(PATH_EDUCATIONS, routeEducations);

    routeEducations.get(PATH_INDEX, controllerEducations.educations.get);
    routeEducations.post(PATH_INDEX, requireAuthentication, controllerEducations.educations.post);
    routeEducations.put(PATH_INDEX, requireAuthentication, controllerEducations.educations.put);
    routeEducations.delete(PATH_INDEX, requireAuthentication, controllerEducations.educations.delete);
    routeEducations.get(PATH_INDEX + ':' + PARAM_ID_EDUCATION, controllerEducations.education.get);
    routeEducations.post(PATH_INDEX + ':' + PARAM_ID_EDUCATION, requireAuthentication, controllerEducations.education.post);
    routeEducations.put(PATH_INDEX + ':' + PARAM_ID_EDUCATION, requireAuthentication, controllerEducations.education.put);
    routeEducations.delete(PATH_INDEX + ':' + PARAM_ID_EDUCATION, requireAuthentication, controllerEducations.education.delete);

    //= ========================
    // Entity Routes
    //= ========================

    app.use(PATH_ENTITIES, routeEntities);

    routeEntities.get(PATH_INDEX, controllerEntities.entities.get);
    routeEntities.post(PATH_INDEX, requireAuthentication, controllerEntities.entities.post);
    routeEntities.put(PATH_INDEX, requireAuthentication, controllerEntities.entities.put);
    routeEntities.delete(PATH_INDEX, requireAuthentication, controllerEntities.entities.delete);
    routeEntities.get(PATH_INDEX + ':' + PARAM_ID_ENTITY, controllerEntities.entity.get);
    routeEntities.post(PATH_INDEX + ':' + PARAM_ID_ENTITY, requireAuthentication, controllerEntities.entity.post);
    routeEntities.put(PATH_INDEX + ':' + PARAM_ID_ENTITY, requireAuthentication, controllerEntities.entity.put);
    routeEntities.delete(PATH_INDEX + ':' + PARAM_ID_ENTITY, requireAuthentication, controllerEntities.entity.delete);

    //= ========================
    // Experience Routes
    //= ========================

    app.use(PATH_EXPERIENCES, routeExperiences);

    routeExperiences.get(PATH_INDEX, controllerExperiences.experiences.get);
    routeExperiences.post(PATH_INDEX, requireAuthentication, controllerExperiences.experiences.post);
    routeExperiences.put(PATH_INDEX, requireAuthentication, controllerExperiences.experiences.put);
    routeExperiences.delete(PATH_INDEX, requireAuthentication, controllerExperiences.experiences.delete);
    routeExperiences.get(PATH_INDEX + ':' + PARAM_ID_EXPERIENCE, controllerExperiences.experience.get);
    routeExperiences.post(PATH_INDEX + ':' + PARAM_ID_EXPERIENCE, requireAuthentication, controllerExperiences.experience.post);
    routeExperiences.put(PATH_INDEX + ':' + PARAM_ID_EXPERIENCE, requireAuthentication, controllerExperiences.experience.put);
    routeExperiences.delete(PATH_INDEX + ':' + PARAM_ID_EXPERIENCE, requireAuthentication, controllerExperiences.experience.delete);

    //= ========================
    // Framework Routes
    //= ========================

    app.use(PATH_FRAMEWORKS, routeFrameworks);

    routeFrameworks.get(PATH_INDEX, controllerFrameworks.frameworks.get);
    routeFrameworks.post(PATH_INDEX, requireAuthentication, controllerFrameworks.frameworks.post);
    routeFrameworks.put(PATH_INDEX, requireAuthentication, controllerFrameworks.frameworks.put);
    routeFrameworks.delete(PATH_INDEX, requireAuthentication, controllerFrameworks.frameworks.delete);
    routeFrameworks.get(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK, controllerFrameworks.framework.get);
    routeFrameworks.post(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK, requireAuthentication, controllerFrameworks.framework.post);
    routeFrameworks.put(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK, requireAuthentication, controllerFrameworks.framework.put);
    routeFrameworks.delete(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK, requireAuthentication, controllerFrameworks.framework.delete);

    //= ========================
    // Framework Tag Routes
    //= ========================

    app.use(PATH_FRAMEWORK_TAGS, routeFrameworkTags);

    routeFrameworkTags.get(PATH_INDEX, controllerFrameworkTags.frameworkTags.get);
    routeFrameworkTags.post(PATH_INDEX, requireAuthentication, controllerFrameworkTags.frameworkTags.post);
    routeFrameworkTags.put(PATH_INDEX, requireAuthentication, controllerFrameworkTags.frameworkTags.put);
    routeFrameworkTags.delete(PATH_INDEX, requireAuthentication, controllerFrameworkTags.frameworkTags.delete);
    routeFrameworkTags.get(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK_TAG, controllerFrameworkTags.frameworkTag.get);
    routeFrameworkTags.post(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK_TAG, requireAuthentication, controllerFrameworkTags.frameworkTag.post);
    routeFrameworkTags.put(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK_TAG, requireAuthentication, controllerFrameworkTags.frameworkTag.put);
    routeFrameworkTags.delete(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK_TAG, requireAuthentication, controllerFrameworkTags.frameworkTag.delete);

    //= ========================
    // Interest Routes
    //= ========================

    app.use(PATH_INTERESTS, routeInterests);

    routeInterests.get(PATH_INDEX, controllerInterests.interests.get);
    routeInterests.post(PATH_INDEX, requireAuthentication, controllerInterests.interests.post);
    routeInterests.put(PATH_INDEX, requireAuthentication, controllerInterests.interests.put);
    routeInterests.delete(PATH_INDEX, requireAuthentication, controllerInterests.interests.delete);
    routeInterests.get(PATH_INDEX + ':' + PARAM_ID_INTEREST, controllerInterests.interest.get);
    routeInterests.post(PATH_INDEX + ':' + PARAM_ID_INTEREST, requireAuthentication, controllerInterests.interest.post);
    routeInterests.put(PATH_INDEX + ':' + PARAM_ID_INTEREST, requireAuthentication, controllerInterests.interest.put);
    routeInterests.delete(PATH_INDEX + ':' + PARAM_ID_INTEREST, requireAuthentication, controllerInterests.interest.delete);

    //= ========================
    // Language Routes
    //= ========================

    app.use(PATH_LANGUAGES, routeLanguages);

    routeLanguages.get(PATH_INDEX, controllerLanguages.languages.get);
    routeLanguages.post(PATH_INDEX, requireAuthentication, controllerLanguages.languages.post);
    routeLanguages.put(PATH_INDEX, requireAuthentication, controllerLanguages.languages.put);
    routeLanguages.delete(PATH_INDEX, requireAuthentication, controllerLanguages.languages.delete);
    routeLanguages.get(PATH_INDEX + ':' + PARAM_ID_LANGUAGE, controllerLanguages.language.get);
    routeLanguages.post(PATH_INDEX + ':' + PARAM_ID_LANGUAGE, requireAuthentication, controllerLanguages.language.post);
    routeLanguages.put(PATH_INDEX + ':' + PARAM_ID_LANGUAGE, requireAuthentication, controllerLanguages.language.put);
    routeLanguages.delete(PATH_INDEX + ':' + PARAM_ID_LANGUAGE, requireAuthentication, controllerLanguages.language.delete);

    //= ========================
    // Link Routes
    //= ========================

    app.use(PATH_LINKS, routeLinks);

    routeLinks.get(PATH_INDEX, controllerLinks.links.get);
    routeLinks.post(PATH_INDEX, requireAuthentication, controllerLinks.links.post);
    routeLinks.put(PATH_INDEX, requireAuthentication, controllerLinks.links.put);
    routeLinks.delete(PATH_INDEX, requireAuthentication, controllerLinks.links.delete);
    routeLinks.get(PATH_INDEX + ':' + PARAM_ID_LINK, controllerLinks.link.get);
    routeLinks.post(PATH_INDEX + ':' + PARAM_ID_LINK, requireAuthentication, controllerLinks.link.post);
    routeLinks.put(PATH_INDEX + ':' + PARAM_ID_LINK, requireAuthentication, controllerLinks.link.put);
    routeLinks.delete(PATH_INDEX + ':' + PARAM_ID_LINK, requireAuthentication, controllerLinks.link.delete);

    //= ========================
    // Link Tag Routes
    //= ========================

    app.use(PATH_LINK_TAGS, routeLinkTags);

    routeLinkTags.get(PATH_INDEX, controllerLinkTags.linkTags.get);
    routeLinkTags.post(PATH_INDEX, requireAuthentication, controllerLinkTags.linkTags.post);
    routeLinkTags.put(PATH_INDEX, requireAuthentication, controllerLinkTags.linkTags.put);
    routeLinkTags.delete(PATH_INDEX, requireAuthentication, controllerLinkTags.linkTags.delete);
    routeLinkTags.get(PATH_INDEX + ':' + PARAM_ID_LINK_TAG, controllerLinkTags.linkTag.get);
    routeLinkTags.post(PATH_INDEX + ':' + PARAM_ID_LINK_TAG, requireAuthentication, controllerLinkTags.linkTag.post);
    routeLinkTags.put(PATH_INDEX + ':' + PARAM_ID_LINK_TAG, requireAuthentication, controllerLinkTags.linkTag.put);
    routeLinkTags.delete(PATH_INDEX + ':' + PARAM_ID_LINK_TAG, requireAuthentication, controllerLinkTags.linkTag.delete);

    //= ========================
    // Operating System Routes
    //= ========================

    app.use(PATH_OPERATING_SYSTEMS, routeOperatingSystems);

    routeOperatingSystems.get(PATH_INDEX, controllerOperatingSystems.operatingSystems.get);
    routeOperatingSystems.post(PATH_INDEX, requireAuthentication, controllerOperatingSystems.operatingSystems.post);
    routeOperatingSystems.put(PATH_INDEX, requireAuthentication, controllerOperatingSystems.operatingSystems.put);
    routeOperatingSystems.delete(PATH_INDEX, requireAuthentication, controllerOperatingSystems.operatingSystems.delete);
    routeOperatingSystems.get(PATH_INDEX + ':' + PARAM_ID_OPERATING_SYSTEM, controllerOperatingSystems.operatingSystem.get);
    routeOperatingSystems.post(PATH_INDEX + ':' + PARAM_ID_OPERATING_SYSTEM, requireAuthentication, controllerOperatingSystems.operatingSystem.post);
    routeOperatingSystems.put(PATH_INDEX + ':' + PARAM_ID_OPERATING_SYSTEM, requireAuthentication, controllerOperatingSystems.operatingSystem.put);
    routeOperatingSystems.delete(PATH_INDEX + ':' + PARAM_ID_OPERATING_SYSTEM, requireAuthentication, controllerOperatingSystems.operatingSystem.delete);


    //= ========================
    // Profile Routes
    //= ========================

    app.use(PATH_PROFILES, routeProfiles);

    routeProfiles.get(PATH_INDEX, controllerProfiles.profiles.get);
    routeProfiles.post(PATH_INDEX, requireAuthentication, controllerProfiles.profiles.post);
    routeProfiles.put(PATH_INDEX, requireAuthentication, controllerProfiles.profiles.put);
    routeProfiles.delete(PATH_INDEX, requireAuthentication, controllerProfiles.profiles.delete);
    routeProfiles.get(PATH_INDEX + ':' + PARAM_ID_PROFILE, controllerProfiles.profile.get);
    routeProfiles.post(PATH_INDEX + ':' + PARAM_ID_PROFILE, requireAuthentication, controllerProfiles.profile.post);
    routeProfiles.put(PATH_INDEX + ':' + PARAM_ID_PROFILE, requireAuthentication, controllerProfiles.profile.put);
    routeProfiles.delete(PATH_INDEX + ':' + PARAM_ID_PROFILE, requireAuthentication, controllerProfiles.profile.delete);

    //= ========================
    // Programming Languages Routes
    //= ========================

    app.use(PATH_PROGRAMMING_LANGUAGES, routeProgrammingLanguages);

    routeProgrammingLanguages.get(PATH_INDEX, controllerProgrammingLanguages.programmingLanguages.get);
    routeProgrammingLanguages.post(PATH_INDEX, requireAuthentication, controllerProgrammingLanguages.programmingLanguages.post);
    routeProgrammingLanguages.put(PATH_INDEX, requireAuthentication, controllerProgrammingLanguages.programmingLanguages.put);
    routeProgrammingLanguages.delete(PATH_INDEX, requireAuthentication, controllerProgrammingLanguages.programmingLanguages.delete);
    routeProgrammingLanguages.get(PATH_INDEX + ':' + PARAM_ID_PROGRAMMING_LANGUAGE, controllerProgrammingLanguages.programmingLanguage.get);
    routeProgrammingLanguages.post(PATH_INDEX + ':' + PARAM_ID_PROGRAMMING_LANGUAGE, requireAuthentication, controllerProgrammingLanguages.programmingLanguage.post);
    routeProgrammingLanguages.put(PATH_INDEX + ':' + PARAM_ID_PROGRAMMING_LANGUAGE, requireAuthentication, controllerProgrammingLanguages.programmingLanguage.put);
    routeProgrammingLanguages.delete(PATH_INDEX + ':' + PARAM_ID_PROGRAMMING_LANGUAGE, requireAuthentication, controllerProgrammingLanguages.programmingLanguage.delete);

    //= ========================
    // Project Routes
    //= ========================

    app.use(PATH_PROJECTS, routeProjects);

    routeProjects.get(PATH_INDEX, controllerProjects.projects.get);
    routeProjects.post(PATH_INDEX, requireAuthentication, controllerProjects.projects.post);
    routeProjects.put(PATH_INDEX, requireAuthentication, controllerProjects.projects.put);
    routeProjects.delete(PATH_INDEX, requireAuthentication, controllerProjects.projects.delete);
    routeProjects.get(PATH_INDEX + ':' + PARAM_ID_PROJECT, controllerProjects.project.get);
    routeProjects.post(PATH_INDEX + ':' + PARAM_ID_PROJECT, requireAuthentication, controllerProjects.project.post);
    routeProjects.put(PATH_INDEX + ':' + PARAM_ID_PROJECT, requireAuthentication, controllerProjects.project.put);
    routeProjects.delete(PATH_INDEX + ':' + PARAM_ID_PROJECT, requireAuthentication, controllerProjects.project.delete);

    //= ========================
    // Project Tag Routes
    //= ========================

    app.use(PATH_PROJECT_TAGS, routeProjectTags);

    routeProjectTags.get(PATH_INDEX, controllerProjectTags.projectTags.get);
    routeProjectTags.post(PATH_INDEX, requireAuthentication, controllerProjectTags.projectTags.post);
    routeProjectTags.put(PATH_INDEX, requireAuthentication, controllerProjectTags.projectTags.put);
    routeProjectTags.delete(PATH_INDEX, requireAuthentication, controllerProjectTags.projectTags.delete);
    routeProjectTags.get(PATH_INDEX + ':' + PARAM_ID_PROJECT_TAG, controllerProjectTags.projectTag.get);
    routeProjectTags.post(PATH_INDEX + ':' + PARAM_ID_PROJECT_TAG, requireAuthentication, controllerProjectTags.projectTag.post);
    routeProjectTags.put(PATH_INDEX + ':' + PARAM_ID_PROJECT_TAG, requireAuthentication, controllerProjectTags.projectTag.put);
    routeProjectTags.delete(PATH_INDEX + ':' + PARAM_ID_PROJECT_TAG, requireAuthentication, controllerProjectTags.projectTag.delete);

    //= ========================
    // Software Framework Routes
    //= ========================

    app.use(PATH_SOFTWARE_FRAMEWORKS, routeSoftwareFrameworks);

    routeSoftwareFrameworks.get(PATH_INDEX, controllerSoftwareFrameworks.softwareFrameworks.get);
    routeSoftwareFrameworks.post(PATH_INDEX, requireAuthentication, controllerSoftwareFrameworks.softwareFrameworks.post);
    routeSoftwareFrameworks.put(PATH_INDEX, requireAuthentication, controllerSoftwareFrameworks.softwareFrameworks.put);
    routeSoftwareFrameworks.delete(PATH_INDEX, requireAuthentication, controllerSoftwareFrameworks.softwareFrameworks.delete);
    routeSoftwareFrameworks.get(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_FRAMEWORK, controllerSoftwareFrameworks.softwareFramework.get);
    routeSoftwareFrameworks.post(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_FRAMEWORK, requireAuthentication, controllerSoftwareFrameworks.softwareFramework.post);
    routeSoftwareFrameworks.put(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_FRAMEWORK, requireAuthentication, controllerSoftwareFrameworks.softwareFramework.put);
    routeSoftwareFrameworks.delete(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_FRAMEWORK, requireAuthentication, controllerSoftwareFrameworks.softwareFramework.delete);

    //= ========================
    // Software Routes
    //= ========================

    app.use(PATH_SOFTWARES, routeSoftwares);

    routeSoftwares.get(PATH_INDEX, controllerSoftwares.softwares.get);
    routeSoftwares.post(PATH_INDEX, requireAuthentication, controllerSoftwares.softwares.post);
    routeSoftwares.put(PATH_INDEX, requireAuthentication, controllerSoftwares.softwares.put);
    routeSoftwares.delete(PATH_INDEX, requireAuthentication, controllerSoftwares.softwares.delete);
    routeSoftwares.get(PATH_INDEX + ':' + PARAM_ID_SOFTWARE, controllerSoftwares.software.get);
    routeSoftwares.post(PATH_INDEX + ':' + PARAM_ID_SOFTWARE, requireAuthentication, controllerSoftwares.software.post);
    routeSoftwares.put(PATH_INDEX + ':' + PARAM_ID_SOFTWARE, requireAuthentication, controllerSoftwares.software.put);
    routeSoftwares.delete(PATH_INDEX + ':' + PARAM_ID_SOFTWARE, requireAuthentication, controllerSoftwares.software.delete);

    //= ========================
    // Software Tag Routes
    //= ========================

    app.use(PATH_SOFTWARE_TAGS, routeSoftwareTags);

    routeSoftwareTags.get(PATH_INDEX, controllerSoftwareTags.softwareTags.get);
    routeSoftwareTags.post(PATH_INDEX, requireAuthentication, controllerSoftwareTags.softwareTags.post);
    routeSoftwareTags.put(PATH_INDEX, requireAuthentication, controllerSoftwareTags.softwareTags.put);
    routeSoftwareTags.delete(PATH_INDEX, requireAuthentication, controllerSoftwareTags.softwareTags.delete);
    routeSoftwareTags.get(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_TAG, controllerSoftwareTags.softwareTag.get);
    routeSoftwareTags.post(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_TAG, requireAuthentication, controllerSoftwareTags.softwareTag.post);
    routeSoftwareTags.put(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_TAG, requireAuthentication, controllerSoftwareTags.softwareTag.put);
    routeSoftwareTags.delete(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_TAG, requireAuthentication, controllerSoftwareTags.softwareTag.delete);

    //= ========================
    // User Routes
    //= ========================

    app.use(PATH_USERS, routeUsers);

    routeUsers.get(PATH_INDEX, requireRole(ROLE_ADMIN), controllerUsers.users.get);
    routeUsers.post(PATH_INDEX, requireRole(ROLE_ADMIN), requireAuthentication, controllerUsers.users.post);
    routeUsers.put(PATH_INDEX, requireRole(ROLE_ADMIN), requireAuthentication, controllerUsers.users.put);
    routeUsers.delete(PATH_INDEX, requireRole(ROLE_ADMIN), requireAuthentication, controllerUsers.users.delete);
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER, requireUserOwner, controllerUsers.user.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER, requireUserOwner, controllerUsers.user.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER, requireUserOwner, controllerUsers.user.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER, requireUserOwner, controllerUsers.user.delete);
    //Computing Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_COMPUTING_TAGS, controllerUsers.user.computingTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_COMPUTING_TAGS, requireUserOwner, controllerUsers.user.computingTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_COMPUTING_TAGS, requireUserOwner, controllerUsers.user.computingTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_COMPUTING_TAGS, requireUserOwner, controllerUsers.user.computingTags.delete);
    //Education Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EDUCATIONS, controllerUsers.user.educations.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EDUCATIONS, requireUserOwner, controllerUsers.user.educations.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EDUCATIONS, requireUserOwner, controllerUsers.user.educations.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EDUCATIONS, requireUserOwner, controllerUsers.user.educations.delete);
    //Entity Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTITIES, controllerUsers.user.entities.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTITIES, requireUserOwner, controllerUsers.user.entities.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTITIES, requireUserOwner, controllerUsers.user.entities.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTITIES, requireUserOwner, controllerUsers.user.entities.delete);
    //Experience Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EXPERIENCES, controllerUsers.user.experiences.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EXPERIENCES, requireUserOwner, controllerUsers.user.experiences.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EXPERIENCES, requireUserOwner, controllerUsers.user.experiences.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EXPERIENCES, requireUserOwner, controllerUsers.user.experiences.delete);
    //Framework Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORKS, controllerUsers.user.frameworks.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORKS, requireUserOwner, controllerUsers.user.frameworks.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORKS, requireUserOwner, controllerUsers.user.frameworks.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORKS, requireUserOwner, controllerUsers.user.frameworks.delete);
    //Framework Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORK_TAGS, controllerUsers.user.frameworkTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORK_TAGS, requireUserOwner, controllerUsers.user.frameworkTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORK_TAGS, requireUserOwner, controllerUsers.user.frameworkTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORK_TAGS, requireUserOwner, controllerUsers.user.frameworkTags.delete);
    //Interest Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_INTERESTS, controllerUsers.user.interests.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_INTERESTS, requireUserOwner, controllerUsers.user.interests.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_INTERESTS, requireUserOwner, controllerUsers.user.interests.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_INTERESTS, requireUserOwner, controllerUsers.user.interests.delete);
    //Language Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LANGUAGES, controllerUsers.user.languages.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LANGUAGES, requireUserOwner, controllerUsers.user.languages.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LANGUAGES, requireUserOwner, controllerUsers.user.languages.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LANGUAGES, requireUserOwner, controllerUsers.user.languages.delete);
    //Links Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINKS, controllerUsers.user.links.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINKS, requireUserOwner, controllerUsers.user.links.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINKS, requireUserOwner, controllerUsers.user.links.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINKS, requireUserOwner, controllerUsers.user.links.delete);
    //Link Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINK_TAGS, controllerUsers.user.linkTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINK_TAGS, requireUserOwner, controllerUsers.user.linkTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINK_TAGS, requireUserOwner, controllerUsers.user.linkTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINK_TAGS, requireUserOwner, controllerUsers.user.linkTags.delete);
    //Operating System Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_OPERATING_SYSTEMS, controllerUsers.user.operatingSystems.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_OPERATING_SYSTEMS, requireUserOwner, controllerUsers.user.operatingSystems.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_OPERATING_SYSTEMS, requireUserOwner, controllerUsers.user.operatingSystems.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_OPERATING_SYSTEMS, requireUserOwner, controllerUsers.user.operatingSystems.delete);
    //Profile Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, controllerUsers.user.profiles.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, requireUserOwner, controllerUsers.user.profiles.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, requireUserOwner, controllerUsers.user.profiles.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, requireUserOwner, controllerUsers.user.profiles.delete);
    //Programming Language Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROGRAMMING_LANGUAGES, controllerUsers.user.programmingLanguages.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROGRAMMING_LANGUAGES, requireUserOwner, controllerUsers.user.programmingLanguages.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROGRAMMING_LANGUAGES, requireUserOwner, controllerUsers.user.programmingLanguages.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROGRAMMING_LANGUAGES, requireUserOwner, controllerUsers.user.programmingLanguages.delete);
    //Project Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECTS, controllerUsers.user.projects.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECTS, requireUserOwner, controllerUsers.user.projects.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECTS, requireUserOwner, controllerUsers.user.projects.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECTS, requireUserOwner, controllerUsers.user.projects.delete);
    //Project Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECT_TAGS, controllerUsers.user.projectTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECT_TAGS, requireUserOwner, controllerUsers.user.projectTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECT_TAGS, requireUserOwner, controllerUsers.user.projectTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECT_TAGS, requireUserOwner, controllerUsers.user.projectTags.delete);
    //Software Framework Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_FRAMEWORKS, controllerUsers.user.softwareFrameworks.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_FRAMEWORKS, requireUserOwner, controllerUsers.user.softwareFrameworks.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_FRAMEWORKS, requireUserOwner, controllerUsers.user.softwareFrameworks.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_FRAMEWORKS, requireUserOwner, controllerUsers.user.softwareFrameworks.delete);
    //Software Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARES, controllerUsers.user.softwares.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARES, requireUserOwner, controllerUsers.user.softwares.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARES, requireUserOwner, controllerUsers.user.softwares.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARES, requireUserOwner, controllerUsers.user.softwares.delete);
    //Software Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_TAGS, controllerUsers.user.softwareTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_TAGS, requireUserOwner, controllerUsers.user.softwareTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_TAGS, requireUserOwner, controllerUsers.user.softwareTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_TAGS, requireUserOwner, controllerUsers.user.softwareTags.delete);
};