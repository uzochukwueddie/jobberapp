import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignIn {
  public async read(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.signIn(req.body);
    req.session = { jwt: response.data.token };
    res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
  }
}
