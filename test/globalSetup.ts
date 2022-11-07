import 'reflect-metadata';
import * as tsNode from 'ts-node';
import dotenv from 'dotenv';

tsNode.register();

const globalSetup = (): void => {
  dotenv.config({
    path: `.env.local`,
  });

};

export default globalSetup;