"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProfilesOfOne = exports.findOne = void 0;
const response_1 = require("../libs/response");
/*
 * One
 */
const findOne = async (req, res, next) => {
    try {
        res.json(new response_1.ReadDocumentResponse(req.user.publicData()));
    }
    catch (err) {
        next(err);
    }
};
exports.findOne = findOne;
/*
 * Others
 */
const filterProfilesOfOne = async (req, res, next) => {
    try {
        const id = req.user._id;
        req.query.filters.owner = id;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.filterProfilesOfOne = filterProfilesOfOne;
