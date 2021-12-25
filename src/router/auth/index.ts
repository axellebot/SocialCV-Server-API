'use strict';

import { Router } from 'express';
import { authenticationCtrl } from '../../controller';
import { Paths } from '../../libs/constant';

const authRouter: Router = Router();

authRouter.post(Paths.login, authenticationCtrl.login);
authRouter.post(Paths.register, authenticationCtrl.register);

export { authRouter };
