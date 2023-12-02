import { verifyGatewayRequest } from '@uzochukwueddie/jobber-shared';
import { Application } from 'express';
import { healthRoutes } from '@review/routes/health';
import { reviewRoutes } from '@review/routes/review';

const BASE_PATH = '/api/v1/review';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, reviewRoutes());
};

export { appRoutes };
