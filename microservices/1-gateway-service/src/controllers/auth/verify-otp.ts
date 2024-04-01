import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class VerifyOTP {
  public async update(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.verifyOTP(req.params.otp, req.body);
    const { message, user, token } = response.data;
    req.session = { jwt: token };
    res.status(StatusCodes.OK).json({ message, user });
  }
}
