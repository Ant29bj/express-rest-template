import { AppServer } from "./src/common/config/app.server.config";
import { UsersRoutes } from "./src/adapters/controllers/user.controller";

const server = new AppServer(3000);

server.registerRouter(new UsersRoutes(server.app));

server.start();