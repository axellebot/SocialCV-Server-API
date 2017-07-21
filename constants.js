"use strict";

//Roles
global.ROLE_ADMIN = "ROLE_ADMIN";
global.ROLE_MEMBER = "ROLE_MEMBER";

//Schema Name
global.MODEL_NAME_COMPUTING_TAG = "ComputingTag";
global.MODEL_NAME_EDUCATION = "Education";
global.MODEL_NAME_ENTITY = "Entity";
global.MODEL_NAME_EXPERIENCE = "Experience";
global.MODEL_NAME_FRAMEWORK = "Framework";
global.MODEL_NAME_FRAMEWORK_TAG = "FrameworkTag";
global.MODEL_NAME_INTEREST = "Interest";
global.MODEL_NAME_LANGUAGE = "Language";
global.MODEL_NAME_LINK = "Link";
global.MODEL_NAME_LINK_TAG = "LinkTag";
global.MODEL_NAME_OPERATING_SYSTEM = "OperatingSystem";
global.MODEL_NAME_PROFILE = "Profile";
global.MODEL_NAME_PROGRAMMING_LANGUAGE = "ProgrammingLanguage";
global.MODEL_NAME_PROJECT = "Project";
global.MODEL_NAME_PROJECT_TAG = "ProjectTag";
global.MODEL_NAME_SOFTWARE_FRAMEWORK = "SoftwareFramework";
global.MODEL_NAME_SOFTWARE = "Software";
global.MODEL_NAME_SOFTWARE_TAG = "SoftwareTag";
global.MODEL_NAME_USER = "User";

//Collection Name
global.COLLECTION_NAME_COMPUTING_TAG = "computingTags";
global.COLLECTION_NAME_EDUCATION = "educations";
global.COLLECTION_NAME_ENTITY = "entities";
global.COLLECTION_NAME_EXPERIENCE = "experiences";
global.COLLECTION_NAME_FRAMEWORK = "frameworks";
global.COLLECTION_NAME_FRAMEWORK_TAG = "frameworkTags";
global.COLLECTION_NAME_INTEREST = "interests";
global.COLLECTION_NAME_LANGUAGE = "languages";
global.COLLECTION_NAME_LINK = "links";
global.COLLECTION_NAME_LINK_TAG = "linkTags";
global.COLLECTION_NAME_OPERATING_SYSTEM = "operatingSystems";
global.COLLECTION_NAME_PROFILE = "profiles";
global.COLLECTION_NAME_PROGRAMMING_LANGUAGE = "programmingLanguages";
global.COLLECTION_NAME_PROJECT = "projects";
global.COLLECTION_NAME_PROJECT_TAG = "projectTags";
global.COLLECTION_NAME_SOFTWARE_FRAMEWORK = "softwareFrameworks";
global.COLLECTION_NAME_SOFTWARE = "softwares";
global.COLLECTION_NAME_SOFTWARE_TAG = "softwareTags";
global.COLLECTION_NAME_USER = "users";

//Paths
global.PATH_INDEX = "/";
global.PATH_AUTHENTICATION = "/auth";
global.PATH_REGISTER = "/register";
global.PATH_LOGIN = "/login";
global.PATH_COMPUTING_TAGS = "/computingTags";
global.PATH_EDUCATIONS = "/educations";
global.PATH_ENTITIES = "/entities";
global.PATH_EXPERIENCES = "/experiences";
global.PATH_FRAMEWORKS = "/frameworks";
global.PATH_FRAMEWORK_TAGS = "/frameworkTags";
global.PATH_INTERESTS = "/interests";
global.PATH_LANGUAGES = "/languages";
global.PATH_LINKS = "/links";
global.PATH_LINK_TAGS = "/linkTags";
global.PATH_OPERATING_SYSTEMS = "/operatingSystems";
global.PATH_PROFILES = "/profiles";
global.PATH_PROGRAMMING_LANGUAGES = "/programmingLanguages";
global.PATH_PROJECTS = "/projects";
global.PATH_PROJECT_TAGS = "/projectTags";
global.PATH_SOFTWARE_FRAMEWORKS = "/softwareFrameworks";
global.PATH_SOFTWARES = "/softwares";
global.PATH_SOFTWARE_TAGS = "/softwareTags";
global.PATH_USERS = "/users";

//Parameters
global.PARAM_ID_COMPUTING_TAG = "ComputingTagId";
global.PARAM_ID_EDUCATION = "EducationId";
global.PARAM_ID_ENTITY = "EntityId";
global.PARAM_ID_EXPERIENCE = "ExperienceId";
global.PARAM_ID_FRAMEWORK = "FrameworkId";
global.PARAM_ID_FRAMEWORK_TAG = "FrameworkTagId";
global.PARAM_ID_INTEREST = "InterestId";
global.PARAM_ID_LANGUAGE = "LanguageId";
global.PARAM_ID_LINK = "LinkId";
global.PARAM_ID_LINK_TAG = "LinkTagId";
global.PARAM_ID_OPERATING_SYSTEM = "OperatingSystemId";
global.PARAM_ID_PROFILE = "ProfileId";
global.PARAM_ID_PROGRAMMING_LANGUAGE = "ProgrammingLanguageId";
global.PARAM_ID_PROJECT = "ProjectId";
global.PARAM_ID_PROJECT_TAG = "ProjectTagId";
global.PARAM_ID_SOFTWARE_FRAMEWORK = "SoftwareFrameworkId";
global.PARAM_ID_SOFTWARE = "SoftwareId";
global.PARAM_ID_SOFTWARE_TAG = "SoftwareTagId";
global.PARAM_ID_USER = "UserId";

//Messages
global.MESSAGE_SUCCESS_RESOURCE_DELETED = "Resource deleted.";
global.MESSAGE_SUCCESS_RESOURCE_UPDATED = "Resource updated.";
global.MESSAGE_ERROR_APP = "Error";
global.MESSAGE_ERROR_DATABASE_CREATE = "Database create action error.";
global.MESSAGE_ERROR_DATABASE_SAVE = "Database save action error.";
global.MESSAGE_ERROR_DATABASE_REMOVE = "Database remove action error.";
global.MESSAGE_ERROR_DATABASE_FIND = "Database find action error.";
global.MESSAGE_ERROR_ACCESS_RESTRICTED = "Access Restricted.";
global.MESSAGE_ERROR_MISSING_PRIVILEGE = "Not enough privileges.";
global.MESSAGE_ERROR_MISSING_EMAIL_ADDRESS = "Missing email address.";
global.MESSAGE_ERROR_MISSING_FULL_NAME = "Missing full name.";
global.MESSAGE_ERROR_MISSING_PASSWORD = "Missing password.";
global.MESSAGE_ERROR_MISSING_DATA = "Missing data.";
global.MESSAGE_ERROR_EMAIL_ADDRESS_ALREADY_EXIST = "E-mail already in use.";
global.MESSAGE_ERROR_PROVIDING_TOKEN = "Can't provide token.";
global.MESSAGE_ERROR_FAILED_AUTHENTICATION_TOKEN = "Failed to authenticate token.";
global.MESSAGE_ERROR_USER_NOT_FOUND = "User not found.";
global.MESSAGE_ERROR_WRONG_DATA = "Wrong data.";
global.MESSAGE_ERROR_WRONG_PASSWORD = "Wrong password.";
global.MESSAGE_ERROR_NOT_FOUND = "Not found.";
global.MESSAGE_ERROR_NOT_IMPLEMENTED = "Feature not implemented yet.";

// HTTP status
global.HTTP_STATUS_CONTINUE = 100;
global.HTTP_STATUS_SWITCHING_PROTOCOLS = 101;
global.HTTP_STATUS_PROCESSING = 10;
global.HTTP_STATUS_OK = 200;
global.HTTP_STATUS_CREATED = 201;
global.HTTP_STATUS_ACCEPTED = 202;
global.HTTP_STATUS_NO_CONTENT = 204;
global.HTTP_STATUS_RESET_CONTENT = 205;
global.HTTP_STATUS_BAD_REQUEST = 400;
global.HTTP_STATUS_UNAUTHORIZED = 401;
global.HTTP_STATUS_NOT_FOUND = 404;
global.HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;
global.HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
global.HTTP_STATUS_NOT_IMPLEMENTED = 501;
global.HTTP_STATUS_BAD_GATEWAY = 502;
global.HTTP_STATUS_SERVICE_UNAVAILABLE = 503;
