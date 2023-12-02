import { IAuthPayload, IMessageDocument } from '@uzochukwueddie/jobber-shared';
import { Response } from 'express';

export const chatMockRequest = (sessionData: IJWT, body: IMessageDocument, currentUser?: IAuthPayload | null, params?: IParams) => ({
  session: sessionData,
  body,
  params,
  currentUser
});

export const chatMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export interface IJWT {
  jwt?: string;
}

export const authUserPayload: IAuthPayload = {
  id: 2,
  username: 'Danny',
  email: 'danny@me.com',
  iat: 12345
};

export interface IParams {
  username?: string;
}

export const messageDocument: IMessageDocument = {
  conversationId: '60263f14648fed5246e322e4',
  body: 'I am sending this message to you',
  file: '',
  fileType: 'png',
  fileSize: '2MB',
  fileName: 'tester',
  gigId: '60263f14648fed5246e322q4',
  sellerId: '60263f14648fed5246e322q4',
  buyerId: '50263f14648fed4346e322d4',
  senderUsername: 'Manny',
  senderPicture: '',
  receiverUsername: 'Sunny',
  receiverPicture: '',
  isRead: false,
  hasOffer: false,
  offer: undefined,
};
