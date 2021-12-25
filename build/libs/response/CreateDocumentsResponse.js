'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentsResponse = void 0;
const constant_1 = require("../constant");
const DataResponse_1 = require("./DataResponse");
class CreateDocumentsResponse extends DataResponse_1.DataResponse {
    constructor(documentsSaved) {
        super(documentsSaved, constant_1.Messages.MESSAGE_SUCCESS_RESOURCE_CREATED);
    }
}
exports.CreateDocumentsResponse = CreateDocumentsResponse;
