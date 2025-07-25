import { Application } from "express";
import { BaseRouter } from "../../common/routes.config";
import { Request, Response } from 'express'

export class UsersRoutes extends BaseRouter {

  constructor (app: Application) {
    super(app, 'User')
  }

  configureRoutes(): Application {
    this.app.get('/users', this.listUsers)
    return this.app;
  }

  listUsers(req: Request, res: Response) {
    res.status(200).json([{ id: 1, name: "Alice" }]);
  }

}