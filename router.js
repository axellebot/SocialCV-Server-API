const express = require('express');
const requireRole = require('./middlewares/requireRole');

// Roles
const
    ROLE_MEMBER = require('./constants').ROLE_MEMBER,
    ROLE_ADMIN = require('./constants').ROLE_ADMIN;

// Controllers
const
    controllerIndex = require('./controllers/index'),
    controllerAuthentification = require('./controllers/authentication'),
    controllerComputingTags = require('./controllers/computingTags'),
    controllerEducations = require('./controllers/educations'),
    controllerEntities = require('./controllers/entities'),
    controllerExperiences = require('./controllers/experiences'),
    controllerFrameworks = require('./controllers/frameworks'),
    controllerInterests = require('./controllers/interests'),
    controllerLanguages = require('./controllers/languages'),
    controllerLinks = require('./controllers/links'),
    controllerLinkTags = require('./controllers/linkTags'),
    controllerOperatingSystems = require('./controllers/operatingSystems'),
    controllerProfils = require('./controllers/profils'),
    controllerProgrammingLanguages = require('./controllers/programmingLanguages'),
    controllerProjects = require('./controllers/projects'),
    controllerSoftwareFrameworks = require('./controllers/softwareFrameworks'),
    controllerSoftwares = require('./controllers/softwares'),
    controllerUsers = require('./controllers/users');

// Route Paths
const PATH_INDEX = "/",
    PATH_AUIHENTICATION = "/auth",
    PATH_COMPUTING_TAGS = "/computingTags",
    PATH_EDUCATIONS = "/educations",
    PATH_ENTITIES = "/entities",
    PATH_EXPERIENCES = "/experiences",
    PATH_FRAMEWORKS = "/frameworks",
    PATH_INTERESTS = "/interests",
    PATH_LANGUAGES = "/languages",
    PATH_LINKS = "/links",
    PATH_LINK_TAGS = "/linkTags",
    PATH_OPERATING_SYSTEMS = "/operatingSystems",
    PATH_PROFILS = "/profils",
    PATH_PROGRAMMING_LANGUAGES = "/programmingLanguages",
    PATH_PROJECTS = "/projects",
    PATH_SOFTWARE_FRAMEWORKS = "/softwareFrameworks",
    PATH_SOFTWARES = "/softwares",
    PATH_USERS = "/users";

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
        routeInterests = express.Router(),
        routeLanguages = express.Router(),
        routeLinks = express.Router(),
        routeLinkTags = express.Router(),
        routeOperatingSystems = express.Router(),
        routeProfils = express.Router(),
        routeProgrammingLanguages = express.Router(),
        routeProjects = express.Router(),
        routeSoftwareFrameworks = express.Router(),
        routeSoftwares = express.Router(),
        routeUsers = express.Router();

    //= ========================
    // Index Routes
    //= ========================

    app.use(PATH_INDEX, routeIndex);

    routeIndex.get('/', controllerIndex.get);

    //= ========================
    // Auth Routes
    //= ========================

    app.use(PATH_AUIHENTICATION, routeAuth);

    routeAuth.post('/register', controllerAuthentification.register.post);
    routeAuth.post('/login', controllerAuthentification.login.post);

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
    // Entitiy Routes
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
    // Interests Routes
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
    // Interests Routes
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
    // Interests Routes
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
    // Profil Routes
    //= ========================

    app.use(PATH_PROFILS, routeProfils);

    routeProfils.get('/', controllerProfils.profils.get);
    routeProfils.post('/', controllerProfils.profils.post);
    routeProfils.put('/', controllerProfils.profils.put);
    routeProfils.delete('/', controllerProfils.profils.delete);
    routeProfils.get('/:id', controllerProfils.profil.get);
    routeProfils.post('/:id', controllerProfils.profil.post);
    routeProfils.put('/:id', controllerProfils.profil.put);
    routeProfils.delete('/:id', controllerProfils.profil.delete);

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
    // User Routes
    //= ========================

    app.use(PATH_USERS,requireRole(ROLE_ADMIN), routeUsers);

    routeUsers.get('/', controllerUsers.users.get);
    routeUsers.post('/', controllerUsers.users.post);
    routeUsers.put('/', controllerUsers.users.put);
    routeUsers.delete('/', controllerUsers.users.delete);
    routeUsers.get('/:id', controllerUsers.user.get);
    routeUsers.post('/:id', controllerUsers.user.post);
    routeUsers.put('/:id', controllerUsers.user.put);
    routeUsers.delete('/:id', controllerUsers.user.delete);
};