'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocumentResponse = void 0;
const constant_1 = require("../constant");
const DataResponse_1 = require("./DataResponse");
class UpdateDocumentResponse extends DataResponse_1.DataResponse {
    constructor(document) {
        super(document, constant_1.Messages.MESSAGE_SUCCESS_RESOURCE_UPDATED);
    }
}
exports.UpdateDocumentResponse = UpdateDocumentResponse;
