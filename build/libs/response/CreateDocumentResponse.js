'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentResponse = void 0;
const constant_1 = require("../constant");
const DataResponse_1 = require("./DataResponse");
class CreateDocumentResponse extends DataResponse_1.DataResponse {
    constructor(documentSaved) {
        super(documentSaved, constant_1.Messages.MESSAGE_SUCCESS_RESOURCE_CREATED);
    }
}
exports.CreateDocumentResponse = CreateDocumentResponse;
