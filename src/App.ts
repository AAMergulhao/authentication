import express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes";
import { createConnection } from "typeorm";
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
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(routes);

    await createConnection();
  }
}

export default new App().server;
