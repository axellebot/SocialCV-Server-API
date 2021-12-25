'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataResponse = void 0;
class DataResponse {
    constructor(data, message = '') {
        this.message = message;
        this.data = data;
    }
}
exports.DataResponse = DataResponse;
