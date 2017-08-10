"use strict";

global.AppError = class extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_APP;
        this.status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
};

global.AccessRestrictedError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_ACCESS_RESTRICTED;
        this.status = status || HTTP_STATUS_UNAUTHORIZED;
    }
};

global.DatabaseCreateError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_DATABASE_CREATE;
        this.status = status || HTTP_STATUS_UNAUTHORIZED;
    }
};

global.DatabaseFindError = class  extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_DATABASE_FIND;
        this.status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
};

global.DatabaseRemoveError = class  extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_DATABASE_REMOVE;
        this.status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
};

global.DatabaseUpdateError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_DATABASE_SAVE;
        this.status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
};

global.EmailAlreadyExistError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_EMAIL_ADDRESS_ALREADY_EXIST;
        this.status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    }
};

global.FailedAuthenticationToken = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_FAILED_AUTHENTICATION_TOKEN;
        this.status = status || HTTP_STATUS_BAD_REQUEST;
    }
};

global.MissingDataError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_MISSING_DATA;
        this.status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    }
};

global.MissingFullNameError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_MISSING_FULL_NAME;
        this.status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    }
};

global.MissingPasswordError = class  extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_MISSING_PASSWORD;
        this.status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    }
};


global.MissingPrivilegeError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_MISSING_PRIVILEGE;
        this.status = status || HTTP_STATUS_UNAUTHORIZED;
    }
};

global.MissingTokenError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_PROVIDING_TOKEN;
        this.status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    }
};

global.NotFoundError = class  extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message + " " + MESSAGE_ERROR_NOT_FOUND || MESSAGE_ERROR_NOT_FOUND;
        this.status = status || HTTP_STATUS_NOT_FOUND;
    }
};

global.NotImplementedError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_NOT_IMPLEMENTED;
        this.status = status || HTTP_STATUS_NOT_IMPLEMENTED
    }
};

global.ProvidingTokenError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_PROVIDING_TOKEN;
        this.status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
};

global.UserNotFoundError = class extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_USER_NOT_FOUND;
        this.status = status || HTTP_STATUS_NOT_FOUND;
    }
};

global.WrongDataError = class  extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_WRONG_DATA;
        this.status = status || HTTP_STATUS_BAD_REQUEST;
    }
};

global.WrongPasswordError = class  extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_WRONG_PASSWORD;
        this.status = status || HTTP_STATUS_BAD_REQUEST;
    }
};

global.WrongQueryCursorPaginationError = class  extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_WRONG_CURSOR_PAGINATION;
        this.status = status || HTTP_STATUS_BAD_REQUEST;
    }
};

global.WrongQueryCursorSortError = class  extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_WRONG_CURSOR_SORT;
        this.status = status || HTTP_STATUS_BAD_REQUEST;
    }
};

global.WrongQueryQueryError = class  extends AppError {
    constructor(message, status) {
        super();
        this.name = this.constructor.name;
        this.message = message || MESSAGE_ERROR_WRONG_QUERY;
        this.status = status || HTTP_STATUS_BAD_REQUEST;
    }
};

