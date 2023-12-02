import { databaseConnection } from '@chat/database';
import { config } from '@chat/config';
import express, { Express } from 'express';
import { start } from '@chat/server';

const initilize = (): void => {
  config.cloudinaryConfig();
  databaseConnection();
  const app: Express = express();
  start(app);
};

initilize();
