import { IAuthPayload, ISellerGig } from '@uzochukwueddie/jobber-shared';
import { Response } from 'express';

export const gigMockRequest = (sessionData: IJWT, body: ISellerGig, currentUser?: IAuthPayload | null, params?: IParams) => ({
  session: sessionData,
  body,
  params,
  currentUser
});

export const gigMockResponse = (): Response => {
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

export const sellerGig: ISellerGig = {
  _id: '60263f14648fed5246e322d8',
  sellerId: '60263f14648fed5246e322e4',
  username: 'Danny',
  email: 'danny@test.com',
  profilePicture: '',
  title: 'I will do any job for you',
  description: 'I will do a great job for you at a very affordable price.',
  categories: 'programming',
  subCategories: ['Java', 'Javascript'],
  tags: ['Java', 'Javascript'],
  price: 50,
  expectedDelivery: '3',
  basicTitle: 'Do any job',
  basicDescription: 'I will do nay job',
  coverImage: ''
};
