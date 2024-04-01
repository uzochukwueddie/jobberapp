import { getAuthUserByOTP, signToken, updateUserOTP } from '@auth/services/auth.service';
import { BadRequestError, IAuthDocument } from '@uzochukwueddie/jobber-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { omit } from 'lodash';

export async function updateOTP(req: Request, res: Response): Promise<void> {
  const { otp } = req.params;
  const { browserName, deviceType } = req.body;
  const checkIfUserExist: IAuthDocument | undefined = await getAuthUserByOTP(otp);
  if (!checkIfUserExist) {
    throw new BadRequestError('OTP is invalid.', 'VerifyOTP updateOTP() method error');
  }
  await updateUserOTP(checkIfUserExist.id!, '', new Date(), browserName, deviceType);
  const userJWT = signToken(checkIfUserExist.id!, checkIfUserExist.email!, checkIfUserExist.username!);
  const userData = omit(checkIfUserExist, ['password']);
  res.status(StatusCodes.OK).json({ message: 'OTP verified successfully.', user: userData, token: userJWT });
}
