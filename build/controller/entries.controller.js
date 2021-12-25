"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllAsOwner = exports.updateManyAsOwner = exports.findManyAsPublic = exports.deleteOneAsOwner = exports.updateOneAsOwner = exports.createOneAsOwner = exports.findOneAsPublic = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const constant_1 = require("../libs/constant");
const error_1 = require("../libs/error");
const response_1 = require("../libs/response");
const entryRepo = (0, typeorm_1.getRepository)(entity_1.Entry);
/*
 * One
 */
const findOneAsPublic = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_ENTRY];
        const entry = await entryRepo.findOne(id);
        if (!entry)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentResponse(entry));
    }
    catch (err) {
        next(err);
    }
};
exports.findOneAsPublic = findOneAsPublic;
const createOneAsOwner = async (req, res, next) => {
    try {
        const entry = entryRepo.create(req.body.data);
        const entryCreated = await entryRepo.save(entry);
        if (!entryCreated)
            throw new error_1.NotFoundError();
        res.json(new response_1.CreateDocumentResponse(entryCreated));
    }
    catch (err) {
        next(err);
    }
};
exports.createOneAsOwner = createOneAsOwner;
const updateOneAsOwner = async (req, res, next) => {
    try {
        const entry = entryRepo.create(req.body.data);
        const entryUpdated = await entryRepo.save(entry);
        if (!entryUpdated)
            throw new error_1.NotFoundError();
        res.json(new response_1.UpdateDocumentResponse(entryUpdated));
    }
    catch (err) {
        next(err);
    }
};
exports.updateOneAsOwner = updateOneAsOwner;
const deleteOneAsOwner = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_ENTRY];
        const updateResult = await entryRepo.softDelete({
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
        const entries = await entryRepo.findAndCount(options);
        if (!entries[0] || entries[0].length <= 0)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentsResponse(entries[0], entries[1]));
    }
    catch (err) {
        next(err);
    }
};
exports.findManyAsPublic = findManyAsPublic;
const updateManyAsOwner = async (req, res, next) => {
    next(new error_1.NotImplementedError('Update Many entries'));
};
exports.updateManyAsOwner = updateManyAsOwner;
const deleteAllAsOwner = async (req, res, next) => {
    next(new error_1.NotImplementedError('Delete All entries'));
};
exports.deleteAllAsOwner = deleteAllAsOwner;
