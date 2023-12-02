import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function health(_req: Request, res: Response): void {
  res.status(StatusCodes.OK).send('Auth service is healthy and OK.');
}
