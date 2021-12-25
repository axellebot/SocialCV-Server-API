'use strict';

import { Router } from 'express';
import { oauthCtrl } from '../../controller';
import { Paths } from '../../libs/constant';
import { requireAuthentication } from '../../middleware/security/authentication';

const oauthRouter = Router();

oauthRouter.post(Paths.token, requireAuthentication(), oauthCtrl.getToken);
oauthRouter.post(Paths.authorize, requireAuthentication(), oauthCtrl.authorize);

export { oauthRouter };
