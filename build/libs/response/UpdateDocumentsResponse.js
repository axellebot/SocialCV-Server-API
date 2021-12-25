'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocumentsResponse = void 0;
const _1 = require(".");
const constant_1 = require("../constant");
class UpdateDocumentsResponse extends _1.DataResponse {
    constructor(documents) {
        super(documents, constant_1.Messages.MESSAGE_SUCCESS_RESOURCE_UPDATED);
    }
}
exports.UpdateDocumentsResponse = UpdateDocumentsResponse;
