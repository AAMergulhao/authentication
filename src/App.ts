import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import * as path from 'path';
import colors from 'colors';

import routes from "@routes/routes";
import swagger from '@routes/swagger';
import { createDatabaseConnection } from '@utils/database';

class App {
  public server: express.Application;

  constructor() {
    dotenv.config({
      path: `.env.${process.env.NODE_ENV}`,
    });
    this.server = express();

    this.setup();
  }

  private async setup() {
    this.server.use('/static', express.static(path.join(__dirname, '../public/')));
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(routes);
    this.server.use(swagger);

    await createDatabaseConnection();

    routes.stack.forEach(routeStack => {
      const methods = Object.keys(routeStack.route.methods);

      for (const method of methods) {
        console.log(colors.blue(`${(method.toUpperCase() + "   ").slice(0, 6)} ----  ${routeStack.route.path}`));
      }
    });
  }
}

export default new App().server;
