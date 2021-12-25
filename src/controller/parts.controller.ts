'use strict';

import { NextFunction, Request, Response } from 'express';
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Part } from '../entity';
import { Parameters } from '../libs/constant';
import { NotFoundError, NotImplementedError } from '../libs/error';
import {
  CreateDocumentResponse,
  DeleteDocumentResponse,
  ReadDocumentResponse,
  ReadDocumentsResponse,
  UpdateDocumentResponse,
} from '../libs/response';

const partRepo: Repository<Part> = getRepository(Part);

/*
 * One
 */

export const findOneAsPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params[Parameters.PARAM_ID_PART];

    const part: Part | undefined = await partRepo.findOne(id);

    if (!part) throw new NotFoundError();

    res.json(new ReadDocumentResponse(part));
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
    const part: Part = partRepo.create(req.body.data as DeepPartial<Part>);

    const partCreated: Part | undefined = await partRepo.save(part);

    if (!partCreated) throw new NotFoundError();

    res.json(new CreateDocumentResponse<Part>(partCreated));
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
    const part: Part = partRepo.create(req.body.data as DeepPartial<Part>);

    const partUpdated: Part | undefined = await partRepo.save(part);

    if (!partUpdated) throw new NotFoundError();

    res.json(new UpdateDocumentResponse(partUpdated));
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
    const id = req.params[Parameters.PARAM_ID_PART];

    const updateResult: UpdateResult = await partRepo.softDelete({
      id,
    } as FindConditions<Part>);

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
    const options: FindManyOptions<Part> = {
      select: req.query.fields,
      where: req.query.filters,
      order: req.query.sort,
      skip: req.query.offset,
      take: req.query.limit,
    } as FindManyOptions<Part>;

    const parts: [Part[], number] = await partRepo.findAndCount(options);

    if (!parts[0] || parts[0].length <= 0) throw new NotFoundError();
    res.json(new ReadDocumentsResponse<Part>(parts[0], parts[1]));
  } catch (err: any) {
    next(err);
  }
};

export const updateManyAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotImplementedError('Update many parts'));
};

export const deleteAllAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotImplementedError('Delete all parts'));
};

/*
 * Others
 */

export const filterGroupsOfOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params[Parameters.PARAM_ID_PART];
  req.query.filters.part = id;
  next();
};
