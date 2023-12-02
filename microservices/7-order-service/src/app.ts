import { databaseConnection } from '@order/database';
import { config } from '@order/config';
import express, { Express } from 'express';
import { start } from '@order/server';

const initilize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
};

initilize();
