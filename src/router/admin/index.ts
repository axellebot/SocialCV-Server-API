import { Router } from 'express';
import { Paths } from '../../libs/constant';
import { adminRolesRouter } from './roles.router';
import { adminScopesRouter } from './scopes.router';
import { adminUsersRouter } from './users.router';

const adminRouter = Router();

adminRouter.use(Paths.roles, adminRolesRouter);
adminRouter.use(Paths.users, adminUsersRouter);
adminRouter.use(Paths.scopes, adminScopesRouter);

// TODO: Add OAuth2.0 admin management

export { adminRouter };
