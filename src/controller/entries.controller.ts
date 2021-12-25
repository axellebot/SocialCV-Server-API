import { NextFunction, Request, Response } from 'express';
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  getRepository,
  UpdateResult,
} from 'typeorm';
import { Entry } from '../entity';
import { Parameters } from '../libs/constant';
import { NotFoundError, NotImplementedError } from '../libs/error';
import {
  CreateDocumentResponse,
  DeleteDocumentResponse,
  ReadDocumentResponse,
  ReadDocumentsResponse,
  UpdateDocumentResponse,
} from '../libs/response';

const entryRepo = getRepository(Entry);

/*
 * One
 */

export const findOneAsPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params[Parameters.PARAM_ID_ENTRY];

    const entry: Entry | undefined = await entryRepo.findOne(id);

    if (!entry) throw new NotFoundError();

    res.json(new ReadDocumentResponse(entry));
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
    const entry: Entry = entryRepo.create(req.body.data as DeepPartial<Entry>);

    const entryCreated: Entry | undefined = await entryRepo.save(entry);

    if (!entryCreated) throw new NotFoundError();

    res.json(new CreateDocumentResponse<Entry>(entryCreated));
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
    const entry: Entry = entryRepo.create(req.body.data as DeepPartial<Entry>);

    const entryUpdated: Entry = await entryRepo.save<Entry>(entry);

    if (!entryUpdated) throw new NotFoundError();

    res.json(new UpdateDocumentResponse<Entry>(entryUpdated));
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
    const id = req.params[Parameters.PARAM_ID_ENTRY];

    const updateResult: UpdateResult = await entryRepo.softDelete({
      id,
    } as FindConditions<Entry>);

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
    const options: FindManyOptions<Entry> = {
      select: req.query.fields,
      where: req.query.filters,
      order: req.query.sort,
      skip: req.query.offset,
      take: req.query.limit,
    } as FindManyOptions<Entry>;

    const entries: [Entry[], number] = await entryRepo.findAndCount(options);

    if (!entries[0] || entries[0].length <= 0) throw new NotFoundError();

    res.json(new ReadDocumentsResponse<Entry>(entries[0], entries[1]));
  } catch (err: any) {
    next(err);
  }
};

export const updateManyAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotImplementedError('Update Many entries'));
};

export const deleteAllAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotImplementedError('Delete All entries'));
};
