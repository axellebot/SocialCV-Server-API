"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuerySelection = void 0;
const fields_1 = __importDefault(require("./fields"));
const filters_1 = __importDefault(require("./filters"));
const pagination_1 = __importDefault(require("./pagination"));
const sort_1 = __importDefault(require("./sort"));
const parseQuerySelection = [
    fields_1.default,
    filters_1.default,
    pagination_1.default,
    sort_1.default,
];
exports.parseQuerySelection = parseQuerySelection;
