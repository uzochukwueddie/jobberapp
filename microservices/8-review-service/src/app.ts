import express, { Express } from 'express';
import { start } from '@review/server';
import { databaseConnection } from '@review/database';

const initialize = (): void => {
  const app: Express = express();
  databaseConnection();
  start(app);
};

initialize();
