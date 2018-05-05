"use strict";

//Roles
global.ROLE_ADMIN = "ROLE_ADMIN";
global.ROLE_MEMBER = "ROLE_MEMBER";

//Schema Name
global.MODEL_NAME_ENTRY = "Link";
global.MODEL_NAME_GROUP = "LinkTag";
global.MODEL_NAME_PART = "OperatingSystem";
global.MODEL_NAME_PROFILE = "Profile";
global.MODEL_NAME_USER = "User";

//Collection Name
global.COLLECTION_NAME_ENTRY = "entries";
global.COLLECTION_NAME_GROUP = "groups";
global.COLLECTION_NAME_PART = "parts";
global.COLLECTION_NAME_PROFILE = "profiles";
global.COLLECTION_NAME_USER = "users";

//Paths
global.PATH_INDEX = "/";
global.PATH_AUTHENTICATION = "/auth";
global.PATH_REGISTER = "/register";
global.PATH_LOGIN = "/login";
global.PATH_ENTRIES = "/entries";
global.PATH_GROUPS = "/groups";
global.PATH_PARTS = "/parts";
global.PATH_PROFILES = "/profiles";
global.PATH_USERS = "/users";

//Parameters
global.PARAM_ID_ENTRY = "entryId";
global.PARAM_ID_GROUP = "groupId";
global.PARAM_ID_PART = "partId";
global.PARAM_ID_PROFILE = "profileId";
global.PARAM_ID_USER = "userId";

//Messages
global.MESSAGE_SUCCESS_RESOURCE_DELETED = "Resource deleted.";
global.MESSAGE_SUCCESS_RESOURCE_UPDATED = "Resource updated.";
global.MESSAGE_SUCCESS_RESOURCE_CREATED = "Resource created.";
global.MESSAGE_ERROR_APP = "Error";
global.MESSAGE_ERROR_RESOURCE_DELETE = "Error deleting resource";
global.MESSAGE_ERROR_RESOURCE_UPDATE = "Error updating resource";
global.MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE = "Resources partially updated";
global.MESSAGE_ERROR_RESOURCES_PARTIAL_DELETE = "Resources partially deleted";
global.MESSAGE_ERROR_DATABASE_COUNT = "Database count action error.";
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
global.MESSAGE_ERROR_WRONG_CURSOR_SORT = "Wrong sort option.";
global.MESSAGE_ERROR_WRONG_CURSOR_PAGINATION = "Wrong pagination option.";
global.MESSAGE_ERROR_WRONG_QUERY = "Wrong query.";
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
