import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import routes from "./routes/routes";
import swagger from './routes/swagger';
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
    this.server.use(swagger);

    await createConnection();
  }
}

export default new App().server;
