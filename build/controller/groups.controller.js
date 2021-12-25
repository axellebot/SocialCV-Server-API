"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEntriesOfOne = exports.deleteAllAsOwner = exports.updateManyAsOwner = exports.findManyAsPublic = exports.deleteOneAsOwner = exports.updateOneAsOwner = exports.createOneAsOwner = exports.findOneAsPublic = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const constant_1 = require("../libs/constant");
const error_1 = require("../libs/error");
const response_1 = require("../libs/response");
const groupRepo = (0, typeorm_1.getRepository)(entity_1.Group);
/*
 * One
 */
const findOneAsPublic = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_GROUP];
        const group = await groupRepo.findOne(id);
        if (!group)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentResponse(group));
    }
    catch (err) {
        next(err);
    }
};
exports.findOneAsPublic = findOneAsPublic;
const createOneAsOwner = async (req, res, next) => {
    try {
        const group = groupRepo.create(req.body.data);
        const groupCreated = await groupRepo.save(group);
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
        const group = groupRepo.create(req.body.data);
        const groupUpdated = await groupRepo.save(group);
        if (!groupUpdated)
            throw new error_1.NotFoundError();
        res.json(new response_1.UpdateDocumentResponse(groupUpdated));
    }
    catch (err) {
        next(err);
    }
};
exports.updateOneAsOwner = updateOneAsOwner;
const deleteOneAsOwner = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_GROUP];
        const updateResult = await groupRepo.softDelete({
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
        const groups = await groupRepo.findAndCount(options);
        if (!groups[0] || groups[0].length <= 0)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentsResponse(groups[0], groups[1]));
    }
    catch (err) {
        next(err);
    }
};
exports.findManyAsPublic = findManyAsPublic;
const updateManyAsOwner = async (req, res, next) => {
    next(new error_1.NotImplementedError('Update many groups'));
};
exports.updateManyAsOwner = updateManyAsOwner;
const deleteAllAsOwner = async (req, res, next) => {
    next(new error_1.NotImplementedError('Delete all groups'));
};
exports.deleteAllAsOwner = deleteAllAsOwner;
/*
 * Others
 */
const filterEntriesOfOne = async (req, res, next) => {
    const id = req.params[constant_1.Parameters.PARAM_ID_GROUP];
    req.query.filters.group = id;
    next();
};
exports.filterEntriesOfOne = filterEntriesOfOne;
