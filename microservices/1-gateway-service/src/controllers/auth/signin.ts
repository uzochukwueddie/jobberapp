import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SignIn {
  public async read(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.signIn(req.body);
    const { message, user, token, browserName, deviceType } = response.data;
    req.session = { jwt: token };
    res.status(StatusCodes.OK).json({ message, user, browserName, deviceType });
  }
}
