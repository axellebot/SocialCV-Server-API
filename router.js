const express = require('express');
const requireRole = require('./middlewares/requireRole');

// Roles
const
    ROLE_MEMBER = global.constants.ROLE.ROLE_MEMBER,
    ROLE_ADMIN = global.constants.ROLE.ROLE_ADMIN;

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

module.exports = function (app) {
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

    routeComputingTags.get('/', controllerComputingTags.computingTags.get);
    routeComputingTags.post('/', controllerComputingTags.computingTags.post);
    routeComputingTags.put('/', controllerComputingTags.computingTags.put);
    routeComputingTags.delete('/', controllerComputingTags.computingTags.delete);
    routeComputingTags.get('/:id', controllerComputingTags.computingTag.get);
    routeComputingTags.post('/:id', controllerComputingTags.computingTag.post);
    routeComputingTags.put('/:id', controllerComputingTags.computingTag.put);
    routeComputingTags.delete('/:id', controllerComputingTags.computingTag.delete);

    //= ========================
    // Education Routes
    //= ========================

    app.use(PATH_EDUCATIONS, routeEducations);

    routeEducations.get('/', controllerEducations.educations.get);
    routeEducations.post('/', controllerEducations.educations.post);
    routeEducations.put('/', controllerEducations.educations.put);
    routeEducations.delete('/', controllerEducations.educations.delete);
    routeEducations.get('/:id', controllerEducations.education.get);
    routeEducations.post('/:id', controllerEducations.education.post);
    routeEducations.put('/:id', controllerEducations.education.put);
    routeEducations.delete('/:id', controllerEducations.education.delete);

    //= ========================
    // Entity Routes
    //= ========================

    app.use(PATH_ENTITIES, routeEntities);

    routeEntities.get('/', controllerEntities.entities.get);
    routeEntities.post('/', controllerEntities.entities.post);
    routeEntities.put('/', controllerEntities.entities.put);
    routeEntities.delete('/', controllerEntities.entities.delete);
    routeEntities.get('/:id', controllerEntities.entity.get);
    routeEntities.post('/:id', controllerEntities.entity.post);
    routeEntities.put('/:id', controllerEntities.entity.put);
    routeEntities.delete('/:id', controllerEntities.entity.delete);

    //= ========================
    // Experience Routes
    //= ========================

    app.use(PATH_EXPERIENCES, routeExperiences);

    routeExperiences.get('/', controllerExperiences.experiences.get);
    routeExperiences.post('/', controllerExperiences.experiences.post);
    routeExperiences.put('/', controllerExperiences.experiences.put);
    routeExperiences.delete('/', controllerExperiences.experiences.delete);
    routeExperiences.get('/:id', controllerExperiences.experience.get);
    routeExperiences.post('/:id', controllerExperiences.experience.post);
    routeExperiences.put('/:id', controllerExperiences.experience.put);
    routeExperiences.delete('/:id', controllerExperiences.experience.delete);

    //= ========================
    // Framework Routes
    //= ========================

    app.use(PATH_FRAMEWORKS, routeFrameworks);

    routeFrameworks.get('/', controllerFrameworks.frameworks.get);
    routeFrameworks.post('/', controllerFrameworks.frameworks.post);
    routeFrameworks.put('/', controllerFrameworks.frameworks.put);
    routeFrameworks.delete('/', controllerFrameworks.frameworks.delete);
    routeFrameworks.get('/:id', controllerFrameworks.framework.get);
    routeFrameworks.post('/:id', controllerFrameworks.framework.post);
    routeFrameworks.put('/:id', controllerFrameworks.framework.put);
    routeFrameworks.delete('/:id', controllerFrameworks.framework.delete);

    //= ========================
    // Framework Tag Routes
    //= ========================

    app.use(PATH_FRAMEWORK_TAGS, routeFrameworkTags);

    routeFrameworkTags.get('/', controllerFrameworkTags.frameworkTags.get);
    routeFrameworkTags.post('/', controllerFrameworkTags.frameworkTags.post);
    routeFrameworkTags.put('/', controllerFrameworkTags.frameworkTags.put);
    routeFrameworkTags.delete('/', controllerFrameworkTags.frameworkTags.delete);
    routeFrameworkTags.get('/:id', controllerFrameworkTags.frameworkTag.get);
    routeFrameworkTags.post('/:id', controllerFrameworkTags.frameworkTag.post);
    routeFrameworkTags.put('/:id', controllerFrameworkTags.frameworkTag.put);
    routeFrameworkTags.delete('/:id', controllerFrameworkTags.frameworkTag.delete);

    //= ========================
    // Interest Routes
    //= ========================

    app.use(PATH_INTERESTS, routeInterests);

    routeInterests.get('/', controllerInterests.interests.get);
    routeInterests.post('/', controllerInterests.interests.post);
    routeInterests.put('/', controllerInterests.interests.put);
    routeInterests.delete('/', controllerInterests.interests.delete);
    routeInterests.get('/:id', controllerInterests.interest.get);
    routeInterests.post('/:id', controllerInterests.interest.post);
    routeInterests.put('/:id', controllerInterests.interest.put);
    routeInterests.delete('/:id', controllerInterests.interest.delete);

    //= ========================
    // Language Routes
    //= ========================

    app.use(PATH_LANGUAGES, routeLanguages);

    routeLanguages.get('/', controllerLanguages.languages.get);
    routeLanguages.post('/', controllerLanguages.languages.post);
    routeLanguages.put('/', controllerLanguages.languages.put);
    routeLanguages.delete('/', controllerLanguages.languages.delete);
    routeLanguages.get('/:id', controllerLanguages.language.get);
    routeLanguages.post('/:id', controllerLanguages.language.post);
    routeLanguages.put('/:id', controllerLanguages.language.put);
    routeLanguages.delete('/:id', controllerLanguages.language.delete);

    //= ========================
    // Link Routes
    //= ========================

    app.use(PATH_LINKS, routeLinks);

    routeLinks.get('/', controllerLinks.links.get);
    routeLinks.post('/', controllerLinks.links.post);
    routeLinks.put('/', controllerLinks.links.put);
    routeLinks.delete('/', controllerLinks.links.delete);
    routeLinks.get('/:id', controllerLinks.link.get);
    routeLinks.post('/:id', controllerLinks.link.post);
    routeLinks.put('/:id', controllerLinks.link.put);
    routeLinks.delete('/:id', controllerLinks.link.delete);

    //= ========================
    // Link Tag Routes
    //= ========================

    app.use(PATH_LINK_TAGS, routeLinkTags);

    routeLinkTags.get('/', controllerLinkTags.linkTags.get);
    routeLinkTags.post('/', controllerLinkTags.linkTags.post);
    routeLinkTags.put('/', controllerLinkTags.linkTags.put);
    routeLinkTags.delete('/', controllerLinkTags.linkTags.delete);
    routeLinkTags.get('/:id', controllerLinkTags.linkTag.get);
    routeLinkTags.post('/:id', controllerLinkTags.linkTag.post);
    routeLinkTags.put('/:id', controllerLinkTags.linkTag.put);
    routeLinkTags.delete('/:id', controllerLinkTags.linkTag.delete);

    //= ========================
    // Operating System Routes
    //= ========================

    app.use(PATH_OPERATING_SYSTEMS, routeOperatingSystems);

    routeOperatingSystems.get('/', controllerOperatingSystems.operatingSystems.get);
    routeOperatingSystems.post('/', controllerOperatingSystems.operatingSystems.post);
    routeOperatingSystems.put('/', controllerOperatingSystems.operatingSystems.put);
    routeOperatingSystems.delete('/', controllerOperatingSystems.operatingSystems.delete);
    routeOperatingSystems.get('/:id', controllerOperatingSystems.operatingSystem.get);
    routeOperatingSystems.post('/:id', controllerOperatingSystems.operatingSystem.post);
    routeOperatingSystems.put('/:id', controllerOperatingSystems.operatingSystem.put);
    routeOperatingSystems.delete('/:id', controllerOperatingSystems.operatingSystem.delete);


    //= ========================
    // Profile Routes
    //= ========================

    app.use(PATH_PROFILES, routeProfiles);

    routeProfiles.get('/', controllerProfiles.profiles.get);
    routeProfiles.post('/', controllerProfiles.profiles.post);
    routeProfiles.put('/', controllerProfiles.profiles.put);
    routeProfiles.delete('/', controllerProfiles.profiles.delete);
    routeProfiles.get('/:id', controllerProfiles.profile.get);
    routeProfiles.post('/:id', controllerProfiles.profile.post);
    routeProfiles.put('/:id', controllerProfiles.profile.put);
    routeProfiles.delete('/:id', controllerProfiles.profile.delete);

    //= ========================
    // Programming Languages Routes
    //= ========================

    app.use(PATH_PROGRAMMING_LANGUAGES, routeProgrammingLanguages);

    routeProgrammingLanguages.get('/', controllerProgrammingLanguages.programmingLanguages.get);
    routeProgrammingLanguages.post('/', controllerProgrammingLanguages.programmingLanguages.post);
    routeProgrammingLanguages.put('/', controllerProgrammingLanguages.programmingLanguages.put);
    routeProgrammingLanguages.delete('/', controllerProgrammingLanguages.programmingLanguages.delete);
    routeProgrammingLanguages.get('/:id', controllerProgrammingLanguages.programmingLanguage.get);
    routeProgrammingLanguages.post('/:id', controllerProgrammingLanguages.programmingLanguage.post);
    routeProgrammingLanguages.put('/:id', controllerProgrammingLanguages.programmingLanguage.put);
    routeProgrammingLanguages.delete('/:id', controllerProgrammingLanguages.programmingLanguage.delete);

    //= ========================
    // Project Routes
    //= ========================

    app.use(PATH_PROJECTS, routeProjects);

    routeProjects.get('/', controllerProjects.projects.get);
    routeProjects.post('/', controllerProjects.projects.post);
    routeProjects.put('/', controllerProjects.projects.put);
    routeProjects.delete('/', controllerProjects.projects.delete);
    routeProjects.get('/:id', controllerProjects.project.get);
    routeProjects.post('/:id', controllerProjects.project.post);
    routeProjects.put('/:id', controllerProjects.project.put);
    routeProjects.delete('/:id', controllerProjects.project.delete);

    //= ========================
    // Project Tag Routes
    //= ========================

    app.use(PATH_PROJECT_TAGS, routeProjectTags);

    routeProjectTags.get('/', controllerProjectTags.projectTags.get);
    routeProjectTags.post('/', controllerProjectTags.projectTags.post);
    routeProjectTags.put('/', controllerProjectTags.projectTags.put);
    routeProjectTags.delete('/', controllerProjectTags.projectTags.delete);
    routeProjectTags.get('/:id', controllerProjectTags.projectTag.get);
    routeProjectTags.post('/:id', controllerProjectTags.projectTag.post);
    routeProjectTags.put('/:id', controllerProjectTags.projectTag.put);
    routeProjectTags.delete('/:id', controllerProjectTags.projectTag.delete);

    //= ========================
    // Software Framework Routes
    //= ========================

    app.use(PATH_SOFTWARE_FRAMEWORKS, routeSoftwareFrameworks);

    routeSoftwareFrameworks.get('/', controllerSoftwareFrameworks.softwareFrameworks.get);
    routeSoftwareFrameworks.post('/', controllerSoftwareFrameworks.softwareFrameworks.post);
    routeSoftwareFrameworks.put('/', controllerSoftwareFrameworks.softwareFrameworks.put);
    routeSoftwareFrameworks.delete('/', controllerSoftwareFrameworks.softwareFrameworks.delete);
    routeSoftwareFrameworks.get('/:id', controllerSoftwareFrameworks.softwareFramework.get);
    routeSoftwareFrameworks.post('/:id', controllerSoftwareFrameworks.softwareFramework.post);
    routeSoftwareFrameworks.put('/:id', controllerSoftwareFrameworks.softwareFramework.put);
    routeSoftwareFrameworks.delete('/:id', controllerSoftwareFrameworks.softwareFramework.delete);

    //= ========================
    // Software Routes
    //= ========================

    app.use(PATH_SOFTWARES, routeSoftwares);

    routeSoftwares.get('/', controllerSoftwares.softwares.get);
    routeSoftwares.post('/', controllerSoftwares.softwares.post);
    routeSoftwares.put('/', controllerSoftwares.softwares.put);
    routeSoftwares.delete('/', controllerSoftwares.softwares.delete);
    routeSoftwares.get('/:id', controllerSoftwares.software.get);
    routeSoftwares.post('/:id', controllerSoftwares.software.post);
    routeSoftwares.put('/:id', controllerSoftwares.software.put);
    routeSoftwares.delete('/:id', controllerSoftwares.software.delete);

    //= ========================
    // Software Tag Routes
    //= ========================

    app.use(PATH_SOFTWARE_TAGS, routeSoftwareTags);

    routeSoftwareTags.get('/', controllerSoftwareTags.softwareTags.get);
    routeSoftwareTags.post('/', controllerSoftwareTags.softwareTags.post);
    routeSoftwareTags.put('/', controllerSoftwareTags.softwareTags.put);
    routeSoftwareTags.delete('/', controllerSoftwareTags.softwareTags.delete);
    routeSoftwareTags.get('/:id', controllerSoftwareTags.softwareTag.get);
    routeSoftwareTags.post('/:id', controllerSoftwareTags.softwareTag.post);
    routeSoftwareTags.put('/:id', controllerSoftwareTags.softwareTag.put);
    routeSoftwareTags.delete('/:id', controllerSoftwareTags.softwareTag.delete);

    //= ========================
    // User Routes
    //= ========================

    app.use(PATH_USERS,  routeUsers);

    routeUsers.get('/', requireRole(ROLE_ADMIN),controllerUsers.users.get);
    routeUsers.post('/',requireRole(ROLE_ADMIN), controllerUsers.users.post);
    routeUsers.put('/', requireRole(ROLE_ADMIN),controllerUsers.users.put);
    routeUsers.delete('/', requireRole(ROLE_ADMIN),controllerUsers.users.delete);
    routeUsers.get('/:id', requireRole(ROLE_ADMIN),controllerUsers.user.get);
    routeUsers.post('/:id', requireRole(ROLE_ADMIN),controllerUsers.user.post);
    routeUsers.put('/:id', requireRole(ROLE_ADMIN),controllerUsers.user.put);
    routeUsers.delete('/:id',requireRole(ROLE_ADMIN), controllerUsers.user.delete);
    //Computing Tag Routes
    routeUsers.get('/:id' + PATH_COMPUTING_TAGS, controllerUsers.user.computingTags.get);
    routeUsers.post('/:id' + PATH_COMPUTING_TAGS, controllerUsers.user.computingTags.post);
    routeUsers.put('/:id' + PATH_COMPUTING_TAGS, controllerUsers.user.computingTags.put);
    routeUsers.delete('/:id' + PATH_COMPUTING_TAGS, controllerUsers.user.computingTags.delete);
    //Education Routes
    routeUsers.get('/:id' + PATH_EDUCATIONS, controllerUsers.user.educations.get);
    routeUsers.post('/:id' + PATH_EDUCATIONS, controllerUsers.user.educations.post);
    routeUsers.put('/:id' + PATH_EDUCATIONS, controllerUsers.user.educations.put);
    routeUsers.delete('/:id' + PATH_EDUCATIONS, controllerUsers.user.educations.delete);
    //Entity Routes
    routeUsers.get('/:id' + PATH_ENTITIES, controllerUsers.user.entities.get);
    routeUsers.post('/:id' + PATH_ENTITIES, controllerUsers.user.entities.post);
    routeUsers.put('/:id' + PATH_ENTITIES, controllerUsers.user.entities.put);
    routeUsers.delete('/:id' + PATH_ENTITIES, controllerUsers.user.entities.delete);
    //Experience Routes
    routeUsers.get('/:id' + PATH_EXPERIENCES, controllerUsers.user.experiences.get);
    routeUsers.post('/:id' + PATH_EXPERIENCES, controllerUsers.user.experiences.post);
    routeUsers.put('/:id' + PATH_EXPERIENCES, controllerUsers.user.experiences.put);
    routeUsers.delete('/:id' + PATH_EXPERIENCES, controllerUsers.user.experiences.delete);
    //Framework Routes
    routeUsers.get('/:id' + PATH_FRAMEWORKS, controllerUsers.user.frameworks.get);
    routeUsers.post('/:id' + PATH_FRAMEWORKS, controllerUsers.user.frameworks.post);
    routeUsers.put('/:id' + PATH_FRAMEWORKS, controllerUsers.user.frameworks.put);
    routeUsers.delete('/:id' + PATH_FRAMEWORKS, controllerUsers.user.frameworks.delete);
    //Framework Tag Routes
    routeUsers.get('/:id' + PATH_FRAMEWORK_TAGS, controllerUsers.user.frameworkTags.get);
    routeUsers.post('/:id' + PATH_FRAMEWORK_TAGS, controllerUsers.user.frameworkTags.post);
    routeUsers.put('/:id' + PATH_FRAMEWORK_TAGS, controllerUsers.user.frameworkTags.put);
    routeUsers.delete('/:id' + PATH_FRAMEWORK_TAGS, controllerUsers.user.frameworkTags.delete);
    //Interest Routes
    routeUsers.get('/:id' + PATH_INTERESTS, controllerUsers.user.interests.get);
    routeUsers.post('/:id' + PATH_INTERESTS, controllerUsers.user.interests.post);
    routeUsers.put('/:id' + PATH_INTERESTS, controllerUsers.user.interests.put);
    routeUsers.delete('/:id' + PATH_INTERESTS, controllerUsers.user.interests.delete);
    //Language Routes
    routeUsers.get('/:id' + PATH_LANGUAGES, controllerUsers.user.languages.get);
    routeUsers.post('/:id' + PATH_LANGUAGES, controllerUsers.user.languages.post);
    routeUsers.put('/:id' + PATH_LANGUAGES, controllerUsers.user.languages.put);
    routeUsers.delete('/:id' + PATH_LANGUAGES, controllerUsers.user.languages.delete);
    //Links Routes
    routeUsers.get('/:id' + PATH_LINKS, controllerUsers.user.links.get);
    routeUsers.post('/:id' + PATH_LINKS, controllerUsers.user.links.post);
    routeUsers.put('/:id' + PATH_LINKS, controllerUsers.user.links.put);
    routeUsers.delete('/:id' + PATH_LINKS, controllerUsers.user.links.delete);
    //Link Tag Routes
    routeUsers.get('/:id' + PATH_LINK_TAGS, controllerUsers.user.linkTags.get);
    routeUsers.post('/:id' + PATH_LINK_TAGS, controllerUsers.user.linkTags.post);
    routeUsers.put('/:id' + PATH_LINK_TAGS, controllerUsers.user.linkTags.put);
    routeUsers.delete('/:id' + PATH_LINK_TAGS, controllerUsers.user.linkTags.delete);
    //Operating System Routes
    routeUsers.get('/:id' + PATH_OPERATING_SYSTEMS, controllerUsers.user.operatingSystems.get);
    routeUsers.post('/:id' + PATH_OPERATING_SYSTEMS, controllerUsers.user.operatingSystems.post);
    routeUsers.put('/:id' + PATH_OPERATING_SYSTEMS, controllerUsers.user.operatingSystems.put);
    routeUsers.delete('/:id' + PATH_OPERATING_SYSTEMS, controllerUsers.user.operatingSystems.delete);
    //Profile Routes
    routeUsers.get('/:id' + PATH_PROFILES, controllerUsers.user.profiles.get);
    routeUsers.post('/:id' + PATH_PROFILES, controllerUsers.user.profiles.post);
    routeUsers.put('/:id' + PATH_PROFILES, controllerUsers.user.profiles.put);
    routeUsers.delete('/:id' + PATH_PROFILES, controllerUsers.user.profiles.delete);
    //Programming Language Routes
    routeUsers.get('/:id' + PATH_PROGRAMMING_LANGUAGES, controllerUsers.user.programmingLanguages.get);
    routeUsers.post('/:id' + PATH_PROGRAMMING_LANGUAGES, controllerUsers.user.programmingLanguages.post);
    routeUsers.put('/:id' + PATH_PROGRAMMING_LANGUAGES, controllerUsers.user.programmingLanguages.put);
    routeUsers.delete('/:id' + PATH_PROGRAMMING_LANGUAGES, controllerUsers.user.programmingLanguages.delete);
    //Project Routes
    routeUsers.get('/:id' + PATH_PROJECTS, controllerUsers.user.projects.get);
    routeUsers.post('/:id' + PATH_PROJECTS, controllerUsers.user.projects.post);
    routeUsers.put('/:id' + PATH_PROJECTS, controllerUsers.user.projects.put);
    routeUsers.delete('/:id' + PATH_PROJECTS, controllerUsers.user.projects.delete);
    //Project Tag Routes
    routeUsers.get('/:id' + PATH_PROJECT_TAGS, controllerUsers.user.projectTags.get);
    routeUsers.post('/:id' + PATH_PROJECT_TAGS, controllerUsers.user.projectTags.post);
    routeUsers.put('/:id' + PATH_PROJECT_TAGS, controllerUsers.user.projectTags.put);
    routeUsers.delete('/:id' + PATH_PROJECT_TAGS, controllerUsers.user.projectTags.delete);
    //Software Framework Routes
    routeUsers.get('/:id' + PATH_SOFTWARE_FRAMEWORKS, controllerUsers.user.softwareFrameworks.get);
    routeUsers.post('/:id' + PATH_SOFTWARE_FRAMEWORKS, controllerUsers.user.softwareFrameworks.post);
    routeUsers.put('/:id' + PATH_SOFTWARE_FRAMEWORKS, controllerUsers.user.softwareFrameworks.put);
    routeUsers.delete('/:id' + PATH_SOFTWARE_FRAMEWORKS, controllerUsers.user.softwareFrameworks.delete);
    //Software Routes
    routeUsers.get('/:id' + PATH_SOFTWARES, controllerUsers.user.softwares.get);
    routeUsers.post('/:id' + PATH_SOFTWARES, controllerUsers.user.softwares.post);
    routeUsers.put('/:id' + PATH_SOFTWARES, controllerUsers.user.softwares.put);
    routeUsers.delete('/:id' + PATH_SOFTWARES, controllerUsers.user.softwares.delete);
    //Software Tag Routes
    routeUsers.get('/:id' + PATH_SOFTWARE_TAGS, controllerUsers.user.softwareTags.get);
    routeUsers.post('/:id' + PATH_SOFTWARE_TAGS, controllerUsers.user.softwareTags.post);
    routeUsers.put('/:id' + PATH_SOFTWARE_TAGS, controllerUsers.user.softwareTags.put);
    routeUsers.delete('/:id' + PATH_SOFTWARE_TAGS, controllerUsers.user.softwareTags.delete);
};