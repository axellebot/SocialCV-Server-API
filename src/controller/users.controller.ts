import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import { NextFunction, Request, Response } from 'express';
import { User } from '../entity';
import { Parameters } from '../libs/constant';
import { NotFoundError, NotImplementedError } from '../libs/error';
import {
  DeleteDocumentResponse,
  ReadDocumentResponse,
  ReadDocumentsResponse,
  UpdateDocumentResponse,
} from '../libs/response';

const userRepo: Repository<User> = getRepository(User);

/*
 * One
 */

export const findOneAsPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params[Parameters.PARAM_ID_USER];

    const user: User | undefined = await userRepo.findOne(id);

    if (!user) throw new NotFoundError();

    res.json(new ReadDocumentResponse<User>(user));
  } catch (err: any) {
    next(err);
  }
};

export const updateOneAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = userRepo.create(req.body.data as DeepPartial<User>);

    const userUpdated: User | undefined = await userRepo.save(user);

    if (!userUpdated) throw new NotFoundError();

    res.json(new UpdateDocumentResponse(userUpdated));
  } catch (err: any) {
    next(err);
  }
};

export const deleteOneAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params[Parameters.PARAM_ID_USER];

    const updateResult: UpdateResult = await userRepo.softDelete({
      id,
    } as FindConditions<User>);

    if (updateResult.affected! <= 0) throw new NotFoundError();

    res.json(new DeleteDocumentResponse(updateResult.affected!));
  } catch (err: any) {
    next(err);
  }
};

/*
 * Many
 */

export const findManyAsPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options: FindManyOptions<User> = {
      select: req.query.fields,
      where: req.query.filters,
      order: req.query.sort,
      skip: req.query.offset,
      take: req.query.limit,
    } as FindManyOptions<User>;

    const users: [User[], number] = await userRepo.findAndCount(options);

    if (!users[0] || users[0].length <= 0) throw new NotFoundError();
    res.json(new ReadDocumentsResponse<User>(users[0], users[1]));
  } catch (err: any) {
    next(err);
  }
};

export const createOneAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO : users - Create user

  // const user: User =  userRepo.create(req.body.data);
  next(new NotImplementedError('Create a new user'));
};

export const updateManyAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotImplementedError('Update many users'));
};

export const deleteAllAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotImplementedError('Delete All users'));
};
