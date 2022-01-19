import express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

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
    this.server.use(express.static(path.join(__dirname, "../public/"))); //Provide static files to the applications
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(bodyParser.json());
  }
}

export default new App().server;
