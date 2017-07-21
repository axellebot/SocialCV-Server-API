"use strict";

const express = require('express');

const requireRole = require('./middlewares/require/role');
const optionPagination = require('./middlewares/option/pagination');

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

    routeComputingTags.get(PATH_INDEX, optionPagination, controllerComputingTags.computingTags.get);
    routeComputingTags.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerComputingTags.computingTags.post);
    routeComputingTags.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerComputingTags.computingTags.put);
    routeComputingTags.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerComputingTags.computingTags.delete);
    routeComputingTags.get(PATH_INDEX + ':' + PARAM_ID_COMPUTING_TAG, controllerComputingTags.computingTag.get);
    routeComputingTags.post(PATH_INDEX + ':' + PARAM_ID_COMPUTING_TAG, requireRole(ROLE_MEMBER), controllerComputingTags.computingTag.post);
    routeComputingTags.put(PATH_INDEX + ':' + PARAM_ID_COMPUTING_TAG, requireRole(ROLE_MEMBER), controllerComputingTags.computingTag.put);
    routeComputingTags.delete(PATH_INDEX + ':' + PARAM_ID_COMPUTING_TAG, requireRole(ROLE_MEMBER), controllerComputingTags.computingTag.delete);

    //= ========================
    // Education Routes
    //= ========================

    app.use(PATH_EDUCATIONS, routeEducations);

    routeEducations.get(PATH_INDEX, optionPagination, controllerEducations.educations.get);
    routeEducations.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerEducations.educations.post);
    routeEducations.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerEducations.educations.put);
    routeEducations.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerEducations.educations.delete);
    routeEducations.get(PATH_INDEX + ':' + PARAM_ID_EDUCATION, controllerEducations.education.get);
    routeEducations.post(PATH_INDEX + ':' + PARAM_ID_EDUCATION, requireRole(ROLE_MEMBER), controllerEducations.education.post);
    routeEducations.put(PATH_INDEX + ':' + PARAM_ID_EDUCATION, requireRole(ROLE_MEMBER), controllerEducations.education.put);
    routeEducations.delete(PATH_INDEX + ':' + PARAM_ID_EDUCATION, requireRole(ROLE_MEMBER), controllerEducations.education.delete);

    //= ========================
    // Entity Routes
    //= ========================

    app.use(PATH_ENTITIES, routeEntities);

    routeEntities.get(PATH_INDEX, optionPagination, controllerEntities.entities.get);
    routeEntities.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerEntities.entities.post);
    routeEntities.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerEntities.entities.put);
    routeEntities.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerEntities.entities.delete);
    routeEntities.get(PATH_INDEX + ':' + PARAM_ID_ENTITY, controllerEntities.entity.get);
    routeEntities.post(PATH_INDEX + ':' + PARAM_ID_ENTITY, requireRole(ROLE_MEMBER), controllerEntities.entity.post);
    routeEntities.put(PATH_INDEX + ':' + PARAM_ID_ENTITY, requireRole(ROLE_MEMBER), controllerEntities.entity.put);
    routeEntities.delete(PATH_INDEX + ':' + PARAM_ID_ENTITY, requireRole(ROLE_MEMBER), controllerEntities.entity.delete);

    //= ========================
    // Experience Routes
    //= ========================

    app.use(PATH_EXPERIENCES, routeExperiences);

    routeExperiences.get(PATH_INDEX, optionPagination, controllerExperiences.experiences.get);
    routeExperiences.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerExperiences.experiences.post);
    routeExperiences.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerExperiences.experiences.put);
    routeExperiences.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerExperiences.experiences.delete);
    routeExperiences.get(PATH_INDEX + ':' + PARAM_ID_EXPERIENCE, controllerExperiences.experience.get);
    routeExperiences.post(PATH_INDEX + ':' + PARAM_ID_EXPERIENCE, requireRole(ROLE_MEMBER), controllerExperiences.experience.post);
    routeExperiences.put(PATH_INDEX + ':' + PARAM_ID_EXPERIENCE, requireRole(ROLE_MEMBER), controllerExperiences.experience.put);
    routeExperiences.delete(PATH_INDEX + ':' + PARAM_ID_EXPERIENCE, requireRole(ROLE_MEMBER), controllerExperiences.experience.delete);

    //= ========================
    // Framework Routes
    //= ========================

    app.use(PATH_FRAMEWORKS, routeFrameworks);

    routeFrameworks.get(PATH_INDEX, optionPagination, controllerFrameworks.frameworks.get);
    routeFrameworks.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerFrameworks.frameworks.post);
    routeFrameworks.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerFrameworks.frameworks.put);
    routeFrameworks.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerFrameworks.frameworks.delete);
    routeFrameworks.get(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK, controllerFrameworks.framework.get);
    routeFrameworks.post(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK, requireRole(ROLE_MEMBER), controllerFrameworks.framework.post);
    routeFrameworks.put(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK, requireRole(ROLE_MEMBER), controllerFrameworks.framework.put);
    routeFrameworks.delete(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK, requireRole(ROLE_MEMBER), controllerFrameworks.framework.delete);

    //= ========================
    // Framework Tag Routes
    //= ========================

    app.use(PATH_FRAMEWORK_TAGS, routeFrameworkTags);

    routeFrameworkTags.get(PATH_INDEX, optionPagination, controllerFrameworkTags.frameworkTags.get);
    routeFrameworkTags.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerFrameworkTags.frameworkTags.post);
    routeFrameworkTags.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerFrameworkTags.frameworkTags.put);
    routeFrameworkTags.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerFrameworkTags.frameworkTags.delete);
    routeFrameworkTags.get(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK_TAG, controllerFrameworkTags.frameworkTag.get);
    routeFrameworkTags.post(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK_TAG, requireRole(ROLE_MEMBER), controllerFrameworkTags.frameworkTag.post);
    routeFrameworkTags.put(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK_TAG, requireRole(ROLE_MEMBER), controllerFrameworkTags.frameworkTag.put);
    routeFrameworkTags.delete(PATH_INDEX + ':' + PARAM_ID_FRAMEWORK_TAG, requireRole(ROLE_MEMBER), controllerFrameworkTags.frameworkTag.delete);

    //= ========================
    // Interest Routes
    //= ========================

    app.use(PATH_INTERESTS, routeInterests);

    routeInterests.get(PATH_INDEX, optionPagination, controllerInterests.interests.get);
    routeInterests.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerInterests.interests.post);
    routeInterests.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerInterests.interests.put);
    routeInterests.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerInterests.interests.delete);
    routeInterests.get(PATH_INDEX + ':' + PARAM_ID_INTEREST, controllerInterests.interest.get);
    routeInterests.post(PATH_INDEX + ':' + PARAM_ID_INTEREST, requireRole(ROLE_MEMBER), controllerInterests.interest.post);
    routeInterests.put(PATH_INDEX + ':' + PARAM_ID_INTEREST, requireRole(ROLE_MEMBER), controllerInterests.interest.put);
    routeInterests.delete(PATH_INDEX + ':' + PARAM_ID_INTEREST, requireRole(ROLE_MEMBER), controllerInterests.interest.delete);

    //= ========================
    // Language Routes
    //= ========================

    app.use(PATH_LANGUAGES, routeLanguages);

    routeLanguages.get(PATH_INDEX, optionPagination, controllerLanguages.languages.get);
    routeLanguages.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerLanguages.languages.post);
    routeLanguages.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerLanguages.languages.put);
    routeLanguages.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerLanguages.languages.delete);
    routeLanguages.get(PATH_INDEX + ':' + PARAM_ID_LANGUAGE, controllerLanguages.language.get);
    routeLanguages.post(PATH_INDEX + ':' + PARAM_ID_LANGUAGE, requireRole(ROLE_MEMBER), controllerLanguages.language.post);
    routeLanguages.put(PATH_INDEX + ':' + PARAM_ID_LANGUAGE, requireRole(ROLE_MEMBER), controllerLanguages.language.put);
    routeLanguages.delete(PATH_INDEX + ':' + PARAM_ID_LANGUAGE, requireRole(ROLE_MEMBER), controllerLanguages.language.delete);

    //= ========================
    // Link Routes
    //= ========================

    app.use(PATH_LINKS, routeLinks);

    routeLinks.get(PATH_INDEX, optionPagination, controllerLinks.links.get);
    routeLinks.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerLinks.links.post);
    routeLinks.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerLinks.links.put);
    routeLinks.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerLinks.links.delete);
    routeLinks.get(PATH_INDEX + ':' + PARAM_ID_LINK, controllerLinks.link.get);
    routeLinks.post(PATH_INDEX + ':' + PARAM_ID_LINK, requireRole(ROLE_MEMBER), controllerLinks.link.post);
    routeLinks.put(PATH_INDEX + ':' + PARAM_ID_LINK, requireRole(ROLE_MEMBER), controllerLinks.link.put);
    routeLinks.delete(PATH_INDEX + ':' + PARAM_ID_LINK, requireRole(ROLE_MEMBER), controllerLinks.link.delete);

    //= ========================
    // Link Tag Routes
    //= ========================

    app.use(PATH_LINK_TAGS, routeLinkTags);

    routeLinkTags.get(PATH_INDEX, optionPagination, controllerLinkTags.linkTags.get);
    routeLinkTags.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerLinkTags.linkTags.post);
    routeLinkTags.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerLinkTags.linkTags.put);
    routeLinkTags.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerLinkTags.linkTags.delete);
    routeLinkTags.get(PATH_INDEX + ':' + PARAM_ID_LINK_TAG, controllerLinkTags.linkTag.get);
    routeLinkTags.post(PATH_INDEX + ':' + PARAM_ID_LINK_TAG, requireRole(ROLE_MEMBER), controllerLinkTags.linkTag.post);
    routeLinkTags.put(PATH_INDEX + ':' + PARAM_ID_LINK_TAG, requireRole(ROLE_MEMBER), controllerLinkTags.linkTag.put);
    routeLinkTags.delete(PATH_INDEX + ':' + PARAM_ID_LINK_TAG, requireRole(ROLE_MEMBER), controllerLinkTags.linkTag.delete);

    //= ========================
    // Operating System Routes
    //= ========================

    app.use(PATH_OPERATING_SYSTEMS, routeOperatingSystems);

    routeOperatingSystems.get(PATH_INDEX, optionPagination, controllerOperatingSystems.operatingSystems.get);
    routeOperatingSystems.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerOperatingSystems.operatingSystems.post);
    routeOperatingSystems.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerOperatingSystems.operatingSystems.put);
    routeOperatingSystems.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerOperatingSystems.operatingSystems.delete);
    routeOperatingSystems.get(PATH_INDEX + ':' + PARAM_ID_OPERATING_SYSTEM, controllerOperatingSystems.operatingSystem.get);
    routeOperatingSystems.post(PATH_INDEX + ':' + PARAM_ID_OPERATING_SYSTEM, requireRole(ROLE_MEMBER), controllerOperatingSystems.operatingSystem.post);
    routeOperatingSystems.put(PATH_INDEX + ':' + PARAM_ID_OPERATING_SYSTEM, requireRole(ROLE_MEMBER), controllerOperatingSystems.operatingSystem.put);
    routeOperatingSystems.delete(PATH_INDEX + ':' + PARAM_ID_OPERATING_SYSTEM, requireRole(ROLE_MEMBER), controllerOperatingSystems.operatingSystem.delete);


    //= ========================
    // Profile Routes
    //= ========================

    app.use(PATH_PROFILES, routeProfiles);

    routeProfiles.get(PATH_INDEX, optionPagination, controllerProfiles.profiles.get);
    routeProfiles.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerProfiles.profiles.post);
    routeProfiles.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerProfiles.profiles.put);
    routeProfiles.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerProfiles.profiles.delete);
    routeProfiles.get(PATH_INDEX + ':' + PARAM_ID_PROFILE, controllerProfiles.profile.get);
    routeProfiles.post(PATH_INDEX + ':' + PARAM_ID_PROFILE, requireRole(ROLE_MEMBER), controllerProfiles.profile.post);
    routeProfiles.put(PATH_INDEX + ':' + PARAM_ID_PROFILE, requireRole(ROLE_MEMBER), controllerProfiles.profile.put);
    routeProfiles.delete(PATH_INDEX + ':' + PARAM_ID_PROFILE, requireRole(ROLE_MEMBER), controllerProfiles.profile.delete);

    //= ========================
    // Programming Languages Routes
    //= ========================

    app.use(PATH_PROGRAMMING_LANGUAGES, routeProgrammingLanguages);

    routeProgrammingLanguages.get(PATH_INDEX, optionPagination, controllerProgrammingLanguages.programmingLanguages.get);
    routeProgrammingLanguages.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerProgrammingLanguages.programmingLanguages.post);
    routeProgrammingLanguages.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerProgrammingLanguages.programmingLanguages.put);
    routeProgrammingLanguages.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerProgrammingLanguages.programmingLanguages.delete);
    routeProgrammingLanguages.get(PATH_INDEX + ':' + PARAM_ID_PROGRAMMING_LANGUAGE, controllerProgrammingLanguages.programmingLanguage.get);
    routeProgrammingLanguages.post(PATH_INDEX + ':' + PARAM_ID_PROGRAMMING_LANGUAGE, requireRole(ROLE_MEMBER), controllerProgrammingLanguages.programmingLanguage.post);
    routeProgrammingLanguages.put(PATH_INDEX + ':' + PARAM_ID_PROGRAMMING_LANGUAGE, requireRole(ROLE_MEMBER), controllerProgrammingLanguages.programmingLanguage.put);
    routeProgrammingLanguages.delete(PATH_INDEX + ':' + PARAM_ID_PROGRAMMING_LANGUAGE, requireRole(ROLE_MEMBER), controllerProgrammingLanguages.programmingLanguage.delete);

    //= ========================
    // Project Routes
    //= ========================

    app.use(PATH_PROJECTS, routeProjects);

    routeProjects.get(PATH_INDEX, optionPagination, controllerProjects.projects.get);
    routeProjects.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerProjects.projects.post);
    routeProjects.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerProjects.projects.put);
    routeProjects.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerProjects.projects.delete);
    routeProjects.get(PATH_INDEX + ':' + PARAM_ID_PROJECT, controllerProjects.project.get);
    routeProjects.post(PATH_INDEX + ':' + PARAM_ID_PROJECT, requireRole(ROLE_MEMBER), controllerProjects.project.post);
    routeProjects.put(PATH_INDEX + ':' + PARAM_ID_PROJECT, requireRole(ROLE_MEMBER), controllerProjects.project.put);
    routeProjects.delete(PATH_INDEX + ':' + PARAM_ID_PROJECT, requireRole(ROLE_MEMBER), controllerProjects.project.delete);

    //= ========================
    // Project Tag Routes
    //= ========================

    app.use(PATH_PROJECT_TAGS, routeProjectTags);

    routeProjectTags.get(PATH_INDEX, optionPagination, controllerProjectTags.projectTags.get);
    routeProjectTags.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerProjectTags.projectTags.post);
    routeProjectTags.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerProjectTags.projectTags.put);
    routeProjectTags.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerProjectTags.projectTags.delete);
    routeProjectTags.get(PATH_INDEX + ':' + PARAM_ID_PROJECT_TAG, controllerProjectTags.projectTag.get);
    routeProjectTags.post(PATH_INDEX + ':' + PARAM_ID_PROJECT_TAG, requireRole(ROLE_MEMBER), controllerProjectTags.projectTag.post);
    routeProjectTags.put(PATH_INDEX + ':' + PARAM_ID_PROJECT_TAG, requireRole(ROLE_MEMBER), controllerProjectTags.projectTag.put);
    routeProjectTags.delete(PATH_INDEX + ':' + PARAM_ID_PROJECT_TAG, requireRole(ROLE_MEMBER), controllerProjectTags.projectTag.delete);

    //= ========================
    // Software Framework Routes
    //= ========================

    app.use(PATH_SOFTWARE_FRAMEWORKS, routeSoftwareFrameworks);

    routeSoftwareFrameworks.get(PATH_INDEX, optionPagination, controllerSoftwareFrameworks.softwareFrameworks.get);
    routeSoftwareFrameworks.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerSoftwareFrameworks.softwareFrameworks.post);
    routeSoftwareFrameworks.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerSoftwareFrameworks.softwareFrameworks.put);
    routeSoftwareFrameworks.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerSoftwareFrameworks.softwareFrameworks.delete);
    routeSoftwareFrameworks.get(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_FRAMEWORK, controllerSoftwareFrameworks.softwareFramework.get);
    routeSoftwareFrameworks.post(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_FRAMEWORK, requireRole(ROLE_MEMBER), controllerSoftwareFrameworks.softwareFramework.post);
    routeSoftwareFrameworks.put(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_FRAMEWORK, requireRole(ROLE_MEMBER), controllerSoftwareFrameworks.softwareFramework.put);
    routeSoftwareFrameworks.delete(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_FRAMEWORK, requireRole(ROLE_MEMBER), controllerSoftwareFrameworks.softwareFramework.delete);

    //= ========================
    // Software Routes
    //= ========================

    app.use(PATH_SOFTWARES, routeSoftwares);

    routeSoftwares.get(PATH_INDEX, optionPagination, controllerSoftwares.softwares.get);
    routeSoftwares.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerSoftwares.softwares.post);
    routeSoftwares.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerSoftwares.softwares.put);
    routeSoftwares.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerSoftwares.softwares.delete);
    routeSoftwares.get(PATH_INDEX + ':' + PARAM_ID_SOFTWARE, controllerSoftwares.software.get);
    routeSoftwares.post(PATH_INDEX + ':' + PARAM_ID_SOFTWARE, requireRole(ROLE_MEMBER), controllerSoftwares.software.post);
    routeSoftwares.put(PATH_INDEX + ':' + PARAM_ID_SOFTWARE, requireRole(ROLE_MEMBER), controllerSoftwares.software.put);
    routeSoftwares.delete(PATH_INDEX + ':' + PARAM_ID_SOFTWARE, requireRole(ROLE_MEMBER), controllerSoftwares.software.delete);

    //= ========================
    // Software Tag Routes
    //= ========================

    app.use(PATH_SOFTWARE_TAGS, routeSoftwareTags);

    routeSoftwareTags.get(PATH_INDEX, optionPagination, controllerSoftwareTags.softwareTags.get);
    routeSoftwareTags.post(PATH_INDEX, requireRole(ROLE_MEMBER), controllerSoftwareTags.softwareTags.post);
    routeSoftwareTags.put(PATH_INDEX, requireRole(ROLE_MEMBER), controllerSoftwareTags.softwareTags.put);
    routeSoftwareTags.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerSoftwareTags.softwareTags.delete);
    routeSoftwareTags.get(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_TAG, controllerSoftwareTags.softwareTag.get);
    routeSoftwareTags.post(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_TAG, requireRole(ROLE_MEMBER), controllerSoftwareTags.softwareTag.post);
    routeSoftwareTags.put(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_TAG, requireRole(ROLE_MEMBER), controllerSoftwareTags.softwareTag.put);
    routeSoftwareTags.delete(PATH_INDEX + ':' + PARAM_ID_SOFTWARE_TAG, requireRole(ROLE_MEMBER), controllerSoftwareTags.softwareTag.delete);

    //= ========================
    // User Routes
    //= ========================

    app.use(PATH_USERS, routeUsers);

    routeUsers.get(PATH_INDEX, requireRole(ROLE_ADMIN), optionPagination, controllerUsers.users.get);
    routeUsers.post(PATH_INDEX, requireRole(ROLE_ADMIN), controllerUsers.users.post);
    routeUsers.put(PATH_INDEX, requireRole(ROLE_ADMIN), controllerUsers.users.put);
    routeUsers.delete(PATH_INDEX, requireRole(ROLE_ADMIN), controllerUsers.users.delete);
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER, requireRole(ROLE_MEMBER), controllerUsers.user.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER, requireRole(ROLE_MEMBER), controllerUsers.user.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER, requireRole(ROLE_MEMBER), controllerUsers.user.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER, requireRole(ROLE_MEMBER), controllerUsers.user.delete);

    //Computing Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_COMPUTING_TAGS, optionPagination, controllerUsers.user.computingTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_COMPUTING_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.computingTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_COMPUTING_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.computingTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_COMPUTING_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.computingTags.delete);

    //Education Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EDUCATIONS, optionPagination, controllerUsers.user.educations.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EDUCATIONS, requireRole(ROLE_MEMBER), controllerUsers.user.educations.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EDUCATIONS, requireRole(ROLE_MEMBER), controllerUsers.user.educations.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EDUCATIONS, requireRole(ROLE_MEMBER), controllerUsers.user.educations.delete);

    //Entity Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTITIES, optionPagination, controllerUsers.user.entities.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTITIES, requireRole(ROLE_MEMBER), controllerUsers.user.entities.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTITIES, requireRole(ROLE_MEMBER), controllerUsers.user.entities.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_ENTITIES, requireRole(ROLE_MEMBER), controllerUsers.user.entities.delete);

    //Experience Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EXPERIENCES, optionPagination, controllerUsers.user.experiences.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EXPERIENCES, requireRole(ROLE_MEMBER), controllerUsers.user.experiences.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EXPERIENCES, requireRole(ROLE_MEMBER), controllerUsers.user.experiences.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_EXPERIENCES, requireRole(ROLE_MEMBER), controllerUsers.user.experiences.delete);

    //Framework Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORKS, optionPagination, controllerUsers.user.frameworks.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORKS, requireRole(ROLE_MEMBER), controllerUsers.user.frameworks.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORKS, requireRole(ROLE_MEMBER), controllerUsers.user.frameworks.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORKS, requireRole(ROLE_MEMBER), controllerUsers.user.frameworks.delete);

    //Framework Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORK_TAGS, optionPagination, controllerUsers.user.frameworkTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORK_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.frameworkTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORK_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.frameworkTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_FRAMEWORK_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.frameworkTags.delete);

    //Interest Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_INTERESTS, optionPagination, controllerUsers.user.interests.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_INTERESTS, requireRole(ROLE_MEMBER), controllerUsers.user.interests.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_INTERESTS, requireRole(ROLE_MEMBER), controllerUsers.user.interests.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_INTERESTS, requireRole(ROLE_MEMBER), controllerUsers.user.interests.delete);

    //Language Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LANGUAGES, optionPagination, controllerUsers.user.languages.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LANGUAGES, requireRole(ROLE_MEMBER), controllerUsers.user.languages.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LANGUAGES, requireRole(ROLE_MEMBER), controllerUsers.user.languages.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LANGUAGES, requireRole(ROLE_MEMBER), controllerUsers.user.languages.delete);

    //Links Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINKS, optionPagination, controllerUsers.user.links.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINKS, requireRole(ROLE_MEMBER), controllerUsers.user.links.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINKS, requireRole(ROLE_MEMBER), controllerUsers.user.links.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINKS, requireRole(ROLE_MEMBER), controllerUsers.user.links.delete);

    //Link Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINK_TAGS, optionPagination, controllerUsers.user.linkTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINK_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.linkTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINK_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.linkTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_LINK_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.linkTags.delete);

    //Operating System Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_OPERATING_SYSTEMS, optionPagination, controllerUsers.user.operatingSystems.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_OPERATING_SYSTEMS, requireRole(ROLE_MEMBER), controllerUsers.user.operatingSystems.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_OPERATING_SYSTEMS, requireRole(ROLE_MEMBER), controllerUsers.user.operatingSystems.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_OPERATING_SYSTEMS, requireRole(ROLE_MEMBER), controllerUsers.user.operatingSystems.delete);

    //Profile Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, optionPagination, controllerUsers.user.profiles.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, requireRole(ROLE_MEMBER), controllerUsers.user.profiles.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, requireRole(ROLE_MEMBER), controllerUsers.user.profiles.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROFILES, requireRole(ROLE_MEMBER), controllerUsers.user.profiles.delete);

    //Programming Language Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROGRAMMING_LANGUAGES, optionPagination, controllerUsers.user.programmingLanguages.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROGRAMMING_LANGUAGES, requireRole(ROLE_MEMBER), controllerUsers.user.programmingLanguages.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROGRAMMING_LANGUAGES, requireRole(ROLE_MEMBER), controllerUsers.user.programmingLanguages.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROGRAMMING_LANGUAGES, requireRole(ROLE_MEMBER), controllerUsers.user.programmingLanguages.delete);

    //Project Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECTS, optionPagination, controllerUsers.user.projects.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECTS, requireRole(ROLE_MEMBER), controllerUsers.user.projects.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECTS, requireRole(ROLE_MEMBER), controllerUsers.user.projects.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECTS, requireRole(ROLE_MEMBER), controllerUsers.user.projects.delete);

    //Project Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECT_TAGS, optionPagination, controllerUsers.user.projectTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECT_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.projectTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECT_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.projectTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_PROJECT_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.projectTags.delete);

    //Software Framework Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_FRAMEWORKS, optionPagination, controllerUsers.user.softwareFrameworks.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_FRAMEWORKS, requireRole(ROLE_MEMBER), controllerUsers.user.softwareFrameworks.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_FRAMEWORKS, requireRole(ROLE_MEMBER), controllerUsers.user.softwareFrameworks.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_FRAMEWORKS, requireRole(ROLE_MEMBER), controllerUsers.user.softwareFrameworks.delete);

    //Software Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARES, optionPagination, controllerUsers.user.softwares.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARES, requireRole(ROLE_MEMBER), controllerUsers.user.softwares.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARES, requireRole(ROLE_MEMBER), controllerUsers.user.softwares.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARES, requireRole(ROLE_MEMBER), controllerUsers.user.softwares.delete);

    //Software Tag Routes
    routeUsers.get(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_TAGS, optionPagination, controllerUsers.user.softwareTags.get);
    routeUsers.post(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.softwareTags.post);
    routeUsers.put(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.softwareTags.put);
    routeUsers.delete(PATH_INDEX + ':' + PARAM_ID_USER + PATH_SOFTWARE_TAGS, requireRole(ROLE_MEMBER), controllerUsers.user.softwareTags.delete);
};