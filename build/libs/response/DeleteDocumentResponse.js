'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDocumentResponse = void 0;
const _1 = require(".");
const constant_1 = require("../constant");
class DeleteDocumentResponse extends _1.DataResponse {
    constructor(count = 0) {
        super(null, `${count} ${constant_1.Messages.MESSAGE_SUCCESS_RESOURCE_DELETED}`);
    }
}
exports.DeleteDocumentResponse = DeleteDocumentResponse;
