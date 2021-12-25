"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllAsAdmin = exports.updateManyAsAdmin = exports.findMany = exports.deleteOneAsAdmin = exports.updateOneAsAdmin = exports.createOneAsAdmin = exports.findOne = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const constant_1 = require("../libs/constant");
const error_1 = require("../libs/error");
const response_1 = require("../libs/response");
const roleRepo = (0, typeorm_1.getRepository)(entity_1.Role);
/*
 * One
 */
const findOne = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_ROLE];
        const role = await roleRepo.findOne(id);
        if (!role)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentResponse(role));
    }
    catch (err) {
        next(err);
    }
};
exports.findOne = findOne;
const createOneAsAdmin = async (req, res, next) => {
    try {
        const role = roleRepo.create(req.body.data);
        const groupCreated = await roleRepo.save(role);
        if (!groupCreated)
            throw new error_1.NotFoundError();
        res.json(new response_1.CreateDocumentResponse(groupCreated));
    }
    catch (err) {
        next(err);
    }
};
exports.createOneAsAdmin = createOneAsAdmin;
const updateOneAsAdmin = async (req, res, next) => {
    try {
        const role = roleRepo.create(req.body.data);
        const groupUpdated = await roleRepo.save(role);
        if (!groupUpdated)
            throw new error_1.NotFoundError();
        res.json(new response_1.UpdateDocumentResponse(groupUpdated));
    }
    catch (err) {
        next(err);
    }
};
exports.updateOneAsAdmin = updateOneAsAdmin;
const deleteOneAsAdmin = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_ROLE];
        const updateResult = await roleRepo.softDelete({
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
exports.deleteOneAsAdmin = deleteOneAsAdmin;
/*
 * Many
 */
const findMany = async (req, res, next) => {
    try {
        const options = {
            select: req.query.fields,
            where: req.query.filters,
            order: req.query.sort,
            skip: req.query.offset,
            take: req.query.limit,
        };
        const roles = await roleRepo.findAndCount(options);
        if (!roles[0] || roles[0].length <= 0)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentsResponse(roles[0], roles[1]));
    }
    catch (err) {
        next(err);
    }
};
exports.findMany = findMany;
const updateManyAsAdmin = async (req, res, next) => {
    return next(new error_1.NotImplementedError('Update many roles'));
};
exports.updateManyAsAdmin = updateManyAsAdmin;
const deleteAllAsAdmin = async (req, res, next) => {
    return next(new error_1.NotImplementedError('Delete all roles'));
};
exports.deleteAllAsAdmin = deleteAllAsAdmin;
