import { NextFunction, Request, Response } from 'express';
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Profile } from '../entity';
import { Parameters } from '../libs/constant';
import { NotFoundError, NotImplementedError } from '../libs/error';
import {
  CreateDocumentResponse,
  DeleteDocumentResponse,
  ReadDocumentResponse,
  ReadDocumentsResponse,
  UpdateDocumentResponse,
} from '../libs/response';

const profileRepo: Repository<Profile> = getRepository(Profile);

/*
 * One
 */

export const findOneAsPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params[Parameters.PARAM_ID_PROFILE];

    const profile: Profile | undefined = await profileRepo.findOne(id);

    if (!profile) throw new NotFoundError();

    res.json(new ReadDocumentResponse(profile));
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
    const profile: Profile = profileRepo.create(
      req.body.data as DeepPartial<Profile>
    );

    const groupCreated: Profile | undefined = await profileRepo.save(profile);

    if (!groupCreated) throw new NotFoundError();

    res.json(new CreateDocumentResponse<Profile>(groupCreated));
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
    const profile: Profile = profileRepo.create(
      req.body.data as DeepPartial<Profile>
    );

    const profileUpdated: Profile | undefined = await profileRepo.save(profile);

    if (!profileUpdated) throw new NotFoundError();

    res.json(new UpdateDocumentResponse(profileUpdated));
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
    const id = req.params[Parameters.PARAM_ID_PROFILE];

    const updateResult: UpdateResult = await profileRepo.softDelete({
      id,
    } as FindConditions<Profile>);

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
    const options: FindManyOptions<Profile> = {
      select: req.query.fields,
      where: req.query.filters,
      order: req.query.sort,
      skip: req.query.offset,
      take: req.query.limit,
    } as FindManyOptions<Profile>;

    const profiles: [Profile[], number] = await profileRepo.findAndCount(
      options
    );

    if (!profiles[0] || profiles[0].length <= 0) throw new NotFoundError();
    res.json(new ReadDocumentsResponse<Profile>(profiles[0], profiles[1]));
  } catch (err: any) {
    next(err);
  }
};

export const updateManyAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new NotImplementedError('Update many Profiles'));
};

export const deleteAllAsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new NotImplementedError('Delete all Profiles'));
};

/*
 * Others
 */

export const filterPartsOfOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params[Parameters.PARAM_ID_PROFILE];
  req.query.filters.profile = id;
  next();
};
