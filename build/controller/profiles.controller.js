"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPartsOfOne = exports.deleteAllAsOwner = exports.updateManyAsOwner = exports.findManyAsPublic = exports.deleteOneAsOwner = exports.updateOneAsOwner = exports.createOneAsOwner = exports.findOneAsPublic = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const constant_1 = require("../libs/constant");
const error_1 = require("../libs/error");
const response_1 = require("../libs/response");
const profileRepo = (0, typeorm_1.getRepository)(entity_1.Profile);
/*
 * One
 */
const findOneAsPublic = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_PROFILE];
        const profile = await profileRepo.findOne(id);
        if (!profile)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentResponse(profile));
    }
    catch (err) {
        next(err);
    }
};
exports.findOneAsPublic = findOneAsPublic;
const createOneAsOwner = async (req, res, next) => {
    try {
        const profile = profileRepo.create(req.body.data);
        const groupCreated = await profileRepo.save(profile);
        if (!groupCreated)
            throw new error_1.NotFoundError();
        res.json(new response_1.CreateDocumentResponse(groupCreated));
    }
    catch (err) {
        next(err);
    }
};
exports.createOneAsOwner = createOneAsOwner;
const updateOneAsOwner = async (req, res, next) => {
    try {
        const profile = profileRepo.create(req.body.data);
        const profileUpdated = await profileRepo.save(profile);
        if (!profileUpdated)
            throw new error_1.NotFoundError();
        res.json(new response_1.UpdateDocumentResponse(profileUpdated));
    }
    catch (err) {
        next(err);
    }
};
exports.updateOneAsOwner = updateOneAsOwner;
const deleteOneAsOwner = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_PROFILE];
        const updateResult = await profileRepo.softDelete({
            id,
        });
        if (updateResult.affected <= 0)
            throw new error_1.NotFoundError();
        res.json(new response_1.DeleteDocumentResponse(updateResult.affected));
    }
    catch (err) {
        next(err);
    }
};
exports.deleteOneAsOwner = deleteOneAsOwner;
/*
 * Many
 */
const findManyAsPublic = async (req, res, next) => {
    try {
        const options = {
            select: req.query.fields,
            where: req.query.filters,
            order: req.query.sort,
            skip: req.query.offset,
            take: req.query.limit,
        };
        const profiles = await profileRepo.findAndCount(options);
        if (!profiles[0] || profiles[0].length <= 0)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentsResponse(profiles[0], profiles[1]));
    }
    catch (err) {
        next(err);
    }
};
exports.findManyAsPublic = findManyAsPublic;
const updateManyAsOwner = async (req, res, next) => {
    return next(new error_1.NotImplementedError('Update many Profiles'));
};
exports.updateManyAsOwner = updateManyAsOwner;
const deleteAllAsOwner = async (req, res, next) => {
    return next(new error_1.NotImplementedError('Delete all Profiles'));
};
exports.deleteAllAsOwner = deleteAllAsOwner;
/*
 * Others
 */
const filterPartsOfOne = async (req, res, next) => {
    const id = req.params[constant_1.Parameters.PARAM_ID_PROFILE];
    req.query.filters.profile = id;
    next();
};
exports.filterPartsOfOne = filterPartsOfOne;
