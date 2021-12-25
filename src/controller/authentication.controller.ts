import { NextFunction, Request, Response } from 'express';
import {
  DeepPartial,
  FindOneOptions,
  getRepository,
  Repository,
} from 'typeorm';
import { User } from '../entity';
import {
  NotImplementedError,
  UserEmailAlreadyExistError,
  UserMissingEmailError,
  UserMissingPasswordError,
  UserMissingUsernameError,
} from '../libs/error';
import { logger } from '../libs/logger';
import { LoginResponse } from '../libs/response';

const userRepo: Repository<User> = getRepository(User);

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new NotImplementedError('Login'));
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info('Register');
    // Check for registration errors
    const userBody = req.body as DeepPartial<User>;

    // Return error if no email provided
    if (!userBody.email || userBody.email === '')
      throw new UserMissingEmailError();

    // Return error if full name not provided
    if (!userBody.username || userBody.username === '')
      throw new UserMissingUsernameError();

    // Return error if no password provided
    if (!userBody.passphrase || userBody.passphrase === '')
      throw new UserMissingPasswordError();

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
    } as FindOneOptions<User>);
    if (existingUser) throw new UserEmailAlreadyExistError();

    const createdUser: User = userRepo.create(userBody);
    const savedUser: User = await userRepo.save(createdUser);

    res.json(new LoginResponse(savedUser));
  } catch (err: any) {
    next(err);
  }
};
