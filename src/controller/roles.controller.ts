import { NextFunction, Request, Response } from 'express';
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Role } from '../entity';
import { Parameters } from '../libs/constant';
import { NotFoundError, NotImplementedError } from '../libs/error';
import {
  CreateDocumentResponse,
  DeleteDocumentResponse,
  ReadDocumentResponse,
  ReadDocumentsResponse,
  UpdateDocumentResponse,
} from '../libs/response';

const roleRepo: Repository<Role> = getRepository(Role);

/*
 * One
 */

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params[Parameters.PARAM_ID_ROLE];

    const role: Role | undefined = await roleRepo.findOne(id);

    if (!role) throw new NotFoundError();

    res.json(new ReadDocumentResponse(role));
  } catch (err: any) {
    next(err);
  }
};

export const createOneAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role: Role = roleRepo.create(req.body.data as DeepPartial<Role>);

    const groupCreated: Role | undefined = await roleRepo.save(role);

    if (!groupCreated) throw new NotFoundError();

    res.json(new CreateDocumentResponse<Role>(groupCreated));
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
    const role: Role = roleRepo.create(req.body.data as DeepPartial<Role>);

    const groupUpdated: Role | undefined = await roleRepo.save(role);

    if (!groupUpdated) throw new NotFoundError();

    res.json(new UpdateDocumentResponse(groupUpdated));
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
    const id = req.params[Parameters.PARAM_ID_ROLE];

    const updateResult: UpdateResult = await roleRepo.softDelete({
      id,
    } as FindConditions<Role>);

    if (updateResult.affected! <= 0) throw new NotFoundError();

    res.json(new DeleteDocumentResponse(updateResult.affected!));
  } catch (err: any) {
    next(err);
  }
};

/*
 * Many
 */

export const findMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options: FindManyOptions<Role> = {
      select: req.query.fields,
      where: req.query.filters,
      order: req.query.sort,
      skip: req.query.offset,
      take: req.query.limit,
    } as FindManyOptions<Role>;

    const roles: [Role[], number] = await roleRepo.findAndCount(options);

    if (!roles[0] || roles[0].length <= 0) throw new NotFoundError();
    res.json(new ReadDocumentsResponse<Role>(roles[0], roles[1]));
  } catch (err: any) {
    next(err);
  }
};

export const updateManyAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new NotImplementedError('Update many roles'));
};

export const deleteAllAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new NotImplementedError('Delete all roles'));
};
