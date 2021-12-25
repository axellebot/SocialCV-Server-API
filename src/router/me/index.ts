import { Router } from 'express';
import { Paths } from '../../libs/constant';
import { meEntriesRouter } from './entries.router';
import { meGroupsRouter } from './groups.router';
import { mePartsRouter } from './parts.router';

const meRouter: Router = Router();

meRouter.use(Paths.entries, meEntriesRouter);
meRouter.use(Paths.groups, meGroupsRouter);
meRouter.use(Paths.parts, mePartsRouter);

// TODO: Add OAuth2.0 user management

export { meRouter };
