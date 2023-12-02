import { getUserByUsername, signToken } from '@auth/services/auth.service';
import { IAuthDocument } from '@uzochukwueddie/jobber-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function token(req: Request, res: Response): Promise<void> {
  const existingUser: IAuthDocument | undefined = await getUserByUsername(req.params.username);
  const userJWT: string = signToken(existingUser!.id!, existingUser!.email!, existingUser!.username!);
  res.status(StatusCodes.OK).json({ message: 'Refresh token', user: existingUser, token: userJWT });
}
