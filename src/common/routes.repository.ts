import { IDebugger } from 'debug';
import { Application } from "express";
import { BaseRouter } from './routes.config';



export class RouterRepository {

  private readonly app: Application;
  private readonly routes: Array<BaseRouter> = [];
  constructor (app: Application) {
    this.app = app;
  }

  getRoutes(): Array<BaseRouter> {
    return this.routes;
  }

  configureAllRoutes(debug: IDebugger) {
    this.routes.forEach(route => {
      debug(`Route Configured: ${route.getName}`)
      route.configureRoutes()
    });
  }

  registerRoute(routeConfig: BaseRouter) {
    this.routes.push(routeConfig)
  }

  getRouteNames() {
    return this.routes.map(route => route.getName());
  }
}