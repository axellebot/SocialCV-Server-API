'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importStar(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_codes_1 = require("http-status-codes");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const typeorm_1 = require("typeorm");
const constant_1 = require("./libs/constant");
const error_1 = require("./libs/error");
const logger_1 = require("./libs/logger");
const router_1 = require("./router");
const me_1 = require("./router/me");
// tslint:disable-next-line: variable-name
const __dirname = path_1.default.resolve();
class Api {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initializeCommons();
        this.initializeMiddlewares();
        this.initializeControllers();
        this.initializeRoutes();
    }
    initializeCommons() {
        // view engine setup
        this.app.set('view engine', 'pug');
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        // Database
        (0, typeorm_1.createConnection)();
    }
    // tslint:disable-next-line: no-empty
    initializeControllers() { }
    initializeMiddlewares() {
        this.app.use((0, helmet_1.default)());
        // serve static files from /public
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        // Add favicon in public
        this.app.use((0, serve_favicon_1.default)(path_1.default.join(__dirname, 'public', 'favicon.ico')));
        this.app.use((0, morgan_1.default)('dev'));
        // use body parser so we can get info from POST and/or URL parameters
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(bodyParser.json()); // for parsing application/json
        this.app.use(bodyParser.urlencoded({
            extended: false,
        })); // for parsing application/x-www-form-urlencoded
    }
    initializeRoutes() {
        const routerIndex = (0, express_1.Router)();
        routerIndex.get('/', this.indexCtrl.get);
        this.app.use(constant_1.Paths.index, routerIndex);
        // Accounts Routes
        this.app.use(constant_1.Paths.account, me_1.meRouter);
        // Admin Routes
        this.app.use(constant_1.Paths.admin, adminRouter);
        // OAuth Routes
        this.app.use(constant_1.Paths.oauth, router_1.oauthRouter);
        // Auth Routes
        this.app.use(constant_1.Paths.authentication, router_1.authRouter);
        // Entries Routes
        this.app.use(constant_1.Paths.entries, router_1.entriesRouter);
        // Groups Routes
        this.app.use(constant_1.Paths.groups, router_1.groupsRouter);
        // Parts Routes
        this.app.use(constant_1.Paths.parts, router_1.partsRouter);
        // Roles Routes
        this.app.use(constant_1.Paths.roles, router_1.rolesRouter);
        // Profiles Routes
        this.app.use(constant_1.Paths.profiles, router_1.profilesRouter);
        // User Routes
        this.app.use(constant_1.Paths.users, router_1.usersRouter);
        // Default Router
        const defaultRouter = (0, express_1.Router)();
        // catch 404 and forward to error handler
        defaultRouter.use('*', (req, res, next) => {
            next(new error_1.NotFoundError());
        });
        // error handler
        defaultRouter.use((err, req, res, next) => {
            // Set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: err.message || constant_1.Messages.MESSAGE_ERROR_APP,
            });
            next();
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`API listening on the port ${this.port}`);
        });
    }
}
exports.default = Api;
