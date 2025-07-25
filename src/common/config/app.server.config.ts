import debug from 'debug';
import cors from 'cors';
import express, { Application } from 'express';
import { format, transports } from 'winston';
import { logger } from 'express-winston';
import { RouterRepository } from '../routes.repository';
import { BaseRouter } from '../routes.config';

export class AppServer {
  public app: Application;
  private port: number;
  private debugLog: debug.IDebugger;
  private routerRepository: RouterRepository;

  constructor (port = 3000) {
    this.app = express();
    this.port = port;
    this.debugLog = debug('app');
    this.routerRepository = new RouterRepository(this.app);

    this.configureLogger();
    this.configureMiddleware();
    this.configureRoutes();
  }


  public start() {
    this.app.listen(this.port, () => {
      console.log(`🚀  Server running at http://localhost:${this.port}`);
    });
  }

  private configureRoutes() {
    this.routerRepository.configureAllRoutes(this.debugLog);
  }

  public registerRouter(router: BaseRouter) {
    this.routerRepository.registerRoute(router);
    this.routerRepository.configureAllRoutes(this.debugLog);
  }

  private configureMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private configureLogger() {
    const { Console } = transports;
    const { combine, colorize, timestamp, printf } = format;
    this.app.use(logger({
      transports: [new Console()],
      format: combine(
        colorize(),
        timestamp(),
        printf(
          ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
        )
      ),
      meta: false,
      msg: 'HTTP {{req.method}} {{req.url}} - {{res.statusCode}} ({{res.responseTime}}ms)'
    }));
  }
}