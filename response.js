"use strict";

global.Response = class {
    constructor() {
        this.error = false;
    }
};

global.DataResponse = class extends Response {
    constructor(data) {
        super();
        this.data = data;
    }
};

global.LoginResponse = class extends Response {
    constructor(token, user) {
        super();
        this.token = token;
        this.user = user;
    }
};

global.SelectDocumentsResponse = class extends DataResponse {
    constructor(documents, count = null, pageCount = null) {
        super(documents);
        this.count = count;
        this.pageCount = pageCount
    }
};

global.SelectDocumentResponse = class extends DataResponse {
    constructor(document) {
        super(document);
    }
};

global.CreateDocumentsResponse = class extends DataResponse {
    constructor(documentsSaved) {
        super(documentsSaved);
        this.message = MESSAGE_SUCCESS_RESOURCE_CREATED;
    }
};

global.CreateDocumentResponse = class extends DataResponse {
    constructor(documentSaved) {
        super(documentSaved);
        this.message = MESSAGE_SUCCESS_RESOURCE_CREATED;
    }
};

global.UpdateDocumentsResponse = class extends DataResponse {
    constructor(documents) {
        super(documents);
        this.message = MESSAGE_SUCCESS_RESOURCE_UPDATED;
    }
};

global.UpdateDocumentResponse = class extends DataResponse {
    constructor(document) {
        super(document);
        this.message = MESSAGE_SUCCESS_RESOURCE_UPDATED;
    }
};

global.DeleteDocumentsResponse = class extends Response {
    constructor(count) {
        super();
        this.message = count + MESSAGE_SUCCESS_RESOURCE_DELETED;
    }
};

global.DeleteDocumentResponse = class extends DataResponse {
    constructor(documentDeleted) {
        super(documentDeleted);
        this.message = MESSAGE_SUCCESS_RESOURCE_DELETED;
    }
};

