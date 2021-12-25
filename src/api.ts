'use strict';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';
import { createConnection } from 'typeorm';
import { Messages, Paths } from './libs/constant';
import { NotFoundError } from './libs/error';
import { logger } from './libs/logger';

import {
  authRouter,
  entriesRouter,
  groupsRouter,
  oauthRouter,
  partsRouter,
  profilesRouter,
  rolesRouter,
  usersRouter,
} from './router';
import { meRouter } from './router/me';

class Api {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeCommons();
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeCommons() {
    // view engine setup
    this.app.set('view engine', 'pug');
    this.app.set('views', path.join(__dirname, 'views'));

    // Database
    createConnection();
  }

  // tslint:disable-next-line: no-empty
  private initializeControllers() {}

  private initializeMiddlewares() {
    this.app.use(helmet());

    // serve static files from /public
    this.app.use(express.static(path.join(__dirname, 'public')));

    // Add favicon in public
    this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    this.app.use(morgan('dev'));

    // use body parser so we can get info from POST and/or URL parameters
    this.app.use(cookieParser());
    this.app.use(bodyParser.json()); // for parsing application/json
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    ); // for parsing application/x-www-form-urlencoded
  }

  private initializeRoutes() {
    const routerIndex = Router();
    routerIndex.get('/', this.indexCtrl.get);
    this.app.use(Paths.index, routerIndex);

    // Accounts Routes
    this.app.use(Paths.account, meRouter);

    // Admin Routes
    this.app.use(Paths.admin, adminRouter);

    // OAuth Routes
    this.app.use(Paths.oauth, oauthRouter);

    // Auth Routes
    this.app.use(Paths.authentication, authRouter);

    // Entries Routes
    this.app.use(Paths.entries, entriesRouter);

    // Groups Routes
    this.app.use(Paths.groups, groupsRouter);

    // Parts Routes
    this.app.use(Paths.parts, partsRouter);

    // Roles Routes
    this.app.use(Paths.roles, rolesRouter);

    // Profiles Routes
    this.app.use(Paths.profiles, profilesRouter);

    // User Routes
    this.app.use(Paths.users, usersRouter);

    // Default Router
    const defaultRouter = Router();

    // catch 404 and forward to error handler
    defaultRouter.use(
      '*',
      (req: Request, res: Response, next: NextFunction) => {
        next(new NotFoundError());
      }
    );

    // error handler
    defaultRouter.use(
      (
        err: NodeJS.ErrnoException,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        // Set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: true,
          message: err.message || Messages.MESSAGE_ERROR_APP,
        });
        next();
      }
    );
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`API listening on the port ${this.port}`);
    });
  }
}

export default Api;
