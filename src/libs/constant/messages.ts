/* eslint-disable no-unused-vars */

// Messages
export enum Messages {
  // APP Error
  MESSAGE_ERROR_APP = 'Error application',
  MESSAGE_ERROR_WRONG_QUERY = 'Wrong query.',
  MESSAGE_ERROR_NOT_FOUND = 'Not found.',
  MESSAGE_ERROR_NOT_IMPLEMENTED = 'Feature not implemented yet.',
  // Access Token
  MESSAGE_ERROR_ACCESS_TOKEN_MISSING_PRIVILEGE = 'Access Token missing privilege',
  MESSAGE_ERROR_TOKEN_EXPIRED = 'Token expired',
  // Authorization Code
  MESSAGE_ERROR_AUTHORIZATION_CODE_EXPIRED = 'Authorization code expired',
  // Body
  MESSAGE_ERROR_BODY_WRONG_DATA = 'Wrong data.',
  MESSAGE_ERROR_BODY_MISSING_DATA = 'Missing data.',
  MESSAGE_ERROR_BODY_MISSING_TOKEN = 'Missing Token.',
  // Resource Success
  MESSAGE_SUCCESS_RESOURCE_DELETED = 'Resource deleted.',
  MESSAGE_SUCCESS_RESOURCE_UPDATED = 'Resource updated.',
  MESSAGE_SUCCESS_RESOURCE_CREATED = 'Resource created.',
  // Resource Error
  MESSAGE_ERROR_RESOURCE_DELETE = 'Error deleting resource',
  MESSAGE_ERROR_RESOURCE_UPDATE = 'Error updating resource',
  MESSAGE_ERROR_RESOURCES_PARTIAL_UPDATE = 'Resources partially updated',
  MESSAGE_ERROR_RESOURCES_PARTIAL_DELETE = 'Resources partially deleted',
  // Database Error
  MESSAGE_ERROR_DATABASE_COUNT = 'Database count action error.',
  MESSAGE_ERROR_DATABASE_CREATE = 'Database create action error.',
  MESSAGE_ERROR_DATABASE_SAVE = 'Database save action error.',
  MESSAGE_ERROR_DATABASE_REMOVE = 'Database remove action error.',
  MESSAGE_ERROR_DATABASE_FIND = 'Database find action error.',
  // User Error
  MESSAGE_ERROR_USER_DISABLED = 'User account disabled.',
  MESSAGE_ERROR_USER_EMAIL_ADDRESS_ALREADY_EXIST = 'E-mail already in use.',
  MESSAGE_ERROR_USER_MISSING = 'User missing.',
  MESSAGE_ERROR_USER_MISSING_PRIVILEGE = 'User missing privilege',
  MESSAGE_ERROR_USER_MISSING_EMAIL_ADDRESS = 'Missing email address',
  MESSAGE_ERROR_USER_MISSING_FULL_NAME = 'Missing full name',
  MESSAGE_ERROR_USER_MISSING_PASSWORD = 'Missing password',
  MESSAGE_ERROR_USER_NOT_FOUND = 'User not found',
  MESSAGE_ERROR_USER_WRONG_PASSWORD = 'User wrong password',
  // Client Error
  MESSAGE_ERROR_CLIENT_MISSING = 'Client missing',
  MESSAGE_ERROR_CLIENT_MISSING_GRANT_TYPE = 'Client missing grant type',
  MESSAGE_ERROR_CLIENT_MISSING_PRIVILEGE = 'Client missing privilege',
  MESSAGE_ERROR_CLIENT_WRONG_CREDENTIALS = 'Client wrong credentials',

  MESSAGE_ERROR_ACCESS_RESTRICTED = 'Access Restricted.',
  MESSAGE_ERROR_MISSING_PRIVILEGE = 'Not enough privileges.',
  MESSAGE_ERROR_PROVIDING_TOKEN = "Can't provide token.",
  MESSAGE_ERROR_FAILED_AUTHENTICATION_TOKEN = 'Failed to authenticate token.',
  MESSAGE_ERROR_EXPIRED_AUTHENTICATION_TOKEN = 'Expired token.',
  // Cursor
  MESSAGE_ERROR_CURSOR_WRONG_SORT = 'Cursor : wrong sort option.',
  MESSAGE_ERROR_CURSOR_WRONG_PAGINATION = 'Cursor : wrong pagination option.',
  // Protocols
  MESSAGE_ERROR_PROTOCOL_WRONG = 'Wrong protocol',
}
