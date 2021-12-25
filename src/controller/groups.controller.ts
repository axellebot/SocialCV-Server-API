import { NextFunction, Request, Response } from 'express';
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Group } from '../entity';
import { Parameters } from '../libs/constant';
import { NotFoundError, NotImplementedError } from '../libs/error';
import {
  CreateDocumentResponse,
  DeleteDocumentResponse,
  ReadDocumentResponse,
  ReadDocumentsResponse,
  UpdateDocumentResponse,
} from '../libs/response';

const groupRepo: Repository<Group> = getRepository(Group);

/*
 * One
 */

export const findOneAsPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params[Parameters.PARAM_ID_GROUP];

    const group: Group | undefined = await groupRepo.findOne(id);

    if (!group) throw new NotFoundError();

    res.json(new ReadDocumentResponse(group));
  } catch (err: any) {
    next(err);
  }
};

export const createOneAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const group: Group = groupRepo.create(req.body.data as DeepPartial<Group>);

    const groupCreated: Group | undefined = await groupRepo.save(group);

    if (!groupCreated) throw new NotFoundError();

    res.json(new CreateDocumentResponse<Group>(groupCreated));
  } catch (err: any) {
    next(err);
  }
};

export const updateOneAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const group: Group = groupRepo.create(req.body.data as DeepPartial<Group>);

    const groupUpdated: Group | undefined = await groupRepo.save(group);

    if (!groupUpdated) throw new NotFoundError();

    res.json(new UpdateDocumentResponse(groupUpdated));
  } catch (err: any) {
    next(err);
  }
};

export const deleteOneAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params[Parameters.PARAM_ID_GROUP];

    const updateResult: UpdateResult = await groupRepo.softDelete({
      id,
    } as FindConditions<Group>);

    if (updateResult.affected! <= 0) throw new NotFoundError();

    res.json(new DeleteDocumentResponse(updateResult.affected));
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
    const options: FindManyOptions<Group> = {
      select: req.query.fields,
      where: req.query.filters,
      order: req.query.sort,
      skip: req.query.offset,
      take: req.query.limit,
    } as FindManyOptions<Group>;

    const groups: [Group[], number] = await groupRepo.findAndCount(options);

    if (!groups[0] || groups[0].length <= 0) throw new NotFoundError();
    res.json(new ReadDocumentsResponse<Group>(groups[0], groups[1]));
  } catch (err: any) {
    next(err);
  }
};

export const updateManyAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotImplementedError('Update many groups'));
};

export const deleteAllAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotImplementedError('Delete all groups'));
};

/*
 * Others
 */

export const filterEntriesOfOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params[Parameters.PARAM_ID_GROUP];
  req.query.filters.group = id;
  next();
};
