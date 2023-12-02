import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthSeed {
  public async create(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.seed(req.params.count);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
