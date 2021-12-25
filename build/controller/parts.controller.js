'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterGroupsOfOne = exports.deleteAllAsOwner = exports.updateManyAsOwner = exports.findManyAsPublic = exports.deleteOneAsOwner = exports.updateOneAsOwner = exports.createOneAsOwner = exports.findOneAsPublic = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const constant_1 = require("../libs/constant");
const error_1 = require("../libs/error");
const response_1 = require("../libs/response");
const partRepo = (0, typeorm_1.getRepository)(entity_1.Part);
/*
 * One
 */
const findOneAsPublic = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_PART];
        const part = await partRepo.findOne(id);
        if (!part)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentResponse(part));
    }
    catch (err) {
        next(err);
    }
};
exports.findOneAsPublic = findOneAsPublic;
const createOneAsOwner = async (req, res, next) => {
    try {
        const part = partRepo.create(req.body.data);
        const partCreated = await partRepo.save(part);
        if (!partCreated)
            throw new error_1.NotFoundError();
        res.json(new response_1.CreateDocumentResponse(partCreated));
    }
    catch (err) {
        next(err);
    }
};
exports.createOneAsOwner = createOneAsOwner;
const updateOneAsOwner = async (req, res, next) => {
    try {
        const part = partRepo.create(req.body.data);
        const partUpdated = await partRepo.save(part);
        if (!partUpdated)
            throw new error_1.NotFoundError();
        res.json(new response_1.UpdateDocumentResponse(partUpdated));
    }
    catch (err) {
        next(err);
    }
};
exports.updateOneAsOwner = updateOneAsOwner;
const deleteOneAsOwner = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_PART];
        const updateResult = await partRepo.softDelete({
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
        const parts = await partRepo.findAndCount(options);
        if (!parts[0] || parts[0].length <= 0)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentsResponse(parts[0], parts[1]));
    }
    catch (err) {
        next(err);
    }
};
exports.findManyAsPublic = findManyAsPublic;
const updateManyAsOwner = async (req, res, next) => {
    next(new error_1.NotImplementedError('Update many parts'));
};
exports.updateManyAsOwner = updateManyAsOwner;
const deleteAllAsOwner = async (req, res, next) => {
    next(new error_1.NotImplementedError('Delete all parts'));
};
exports.deleteAllAsOwner = deleteAllAsOwner;
/*
 * Others
 */
const filterGroupsOfOne = async (req, res, next) => {
    const id = req.params[constant_1.Parameters.PARAM_ID_PART];
    req.query.filters.part = id;
    next();
};
exports.filterGroupsOfOne = filterGroupsOfOne;
