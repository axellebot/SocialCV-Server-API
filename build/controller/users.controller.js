"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllAsAdmin = exports.updateManyAsAdmin = exports.createOneAsAdmin = exports.findManyAsPublic = exports.deleteOneAsAdmin = exports.updateOneAsAdmin = exports.findOneAsPublic = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const constant_1 = require("../libs/constant");
const error_1 = require("../libs/error");
const response_1 = require("../libs/response");
const userRepo = (0, typeorm_1.getRepository)(entity_1.User);
/*
 * One
 */
const findOneAsPublic = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_USER];
        const user = await userRepo.findOne(id);
        if (!user)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentResponse(user));
    }
    catch (err) {
        next(err);
    }
};
exports.findOneAsPublic = findOneAsPublic;
const updateOneAsAdmin = async (req, res, next) => {
    try {
        const user = userRepo.create(req.body.data);
        const userUpdated = await userRepo.save(user);
        if (!userUpdated)
            throw new error_1.NotFoundError();
        res.json(new response_1.UpdateDocumentResponse(userUpdated));
    }
    catch (err) {
        next(err);
    }
};
exports.updateOneAsAdmin = updateOneAsAdmin;
const deleteOneAsAdmin = async (req, res, next) => {
    try {
        const id = req.params[constant_1.Parameters.PARAM_ID_USER];
        const updateResult = await userRepo.softDelete({
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
const findManyAsPublic = async (req, res, next) => {
    try {
        const options = {
            select: req.query.fields,
            where: req.query.filters,
            order: req.query.sort,
            skip: req.query.offset,
            take: req.query.limit,
        };
        const users = await userRepo.findAndCount(options);
        if (!users[0] || users[0].length <= 0)
            throw new error_1.NotFoundError();
        res.json(new response_1.ReadDocumentsResponse(users[0], users[1]));
    }
    catch (err) {
        next(err);
    }
};
exports.findManyAsPublic = findManyAsPublic;
const createOneAsAdmin = async (req, res, next) => {
    // TODO : users - Create user
    // const user: User =  userRepo.create(req.body.data);
    next(new error_1.NotImplementedError('Create a new user'));
};
exports.createOneAsAdmin = createOneAsAdmin;
const updateManyAsAdmin = async (req, res, next) => {
    next(new error_1.NotImplementedError('Update many users'));
};
exports.updateManyAsAdmin = updateManyAsAdmin;
const deleteAllAsAdmin = async (req, res, next) => {
    next(new error_1.NotImplementedError('Delete All users'));
};
exports.deleteAllAsAdmin = deleteAllAsAdmin;
