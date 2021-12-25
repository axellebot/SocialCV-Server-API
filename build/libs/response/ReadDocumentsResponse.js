'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadDocumentsResponse = void 0;
const _1 = require(".");
class ReadDocumentsResponse extends _1.DataResponse {
    constructor(documents, total) {
        super(documents);
        this.total = total;
    }
}
exports.ReadDocumentsResponse = ReadDocumentsResponse;
