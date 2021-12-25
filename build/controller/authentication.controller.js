"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const error_1 = require("../libs/error");
const logger_1 = require("../libs/logger");
const response_1 = require("../libs/response");
const userRepo = (0, typeorm_1.getRepository)(entity_1.User);
const login = async (req, res, next) => {
    return next(new error_1.NotImplementedError('Login'));
};
exports.login = login;
const register = async (req, res, next) => {
    try {
        logger_1.logger.info('Register');
        // Check for registration errors
        const userBody = req.body;
        // Return error if no email provided
        if (!userBody.email || userBody.email === '')
            throw new error_1.UserMissingEmailError();
        // Return error if full name not provided
        if (!userBody.username || userBody.username === '')
            throw new error_1.UserMissingUsernameError();
        // Return error if no password provided
        if (!userBody.password || userBody.password === '')
            throw new error_1.UserMissingPasswordError();
        // If user is not unique, return error
        const existingUser = await userRepo.findOne({
            where: [
                {
                    email: userBody.email,
                },
                {
                    username: userBody.username,
                },
            ],
        });
        if (existingUser)
            throw new error_1.UserEmailAlreadyExistError();
        const createdUser = userRepo.create(userBody);
        const savedUser = await userRepo.save(createdUser);
        res.json(new response_1.LoginResponse(savedUser));
    }
    catch (err) {
        next(err);
    }
};
exports.register = register;
