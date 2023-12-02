import { IAuthPayload, IOrderDocument } from '@uzochukwueddie/jobber-shared';
import { Response } from 'express';

export const orderMockRequest = (sessionData: IJWT, body: IOrderDocument, currentUser?: IAuthPayload | null, params?: IParams) => ({
  session: sessionData,
  body,
  params,
  currentUser
});

export const orderMockResponse = (): Response => {
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

export const orderDocument: IOrderDocument = {
  offer: {
    gigTitle: '',
    price: 20,
    description: '',
    deliveryInDays: 2,
    oldDeliveryDate: '2023-10-19T07:42:24.451Z',
    newDeliveryDate: '2023-10-20T07:42:24.451Z',
    accepted: false,
    cancelled: false,
    reason: ''
  },
  gigId: '60263f14648fed5246e322q4',
  sellerId: '60263f14648fed5246e322q4',
  sellerUsername: 'Manny',
  sellerImage: 'https://placehold.co/600x400',
  sellerEmail: 'manny@test.com',
  gigCoverImage: 'https://placehold.co/600x400',
  gigMainTitle: 'I will create a Complete React and NodeJS App',
  gigBasicTitle: 'React & NodeJS App',
  gigBasicDescription: 'I will build a react app with a nodejs server',
  buyerId: '50263f14648fed4346e322d4',
  buyerUsername: 'Danny',
  buyerEmail: 'danny@test.com',
  buyerImage: 'https://placehold.co/600x400',
  status: 'in progress',
  orderId: '60263f14648fed5246e322e4',
  invoiceId: 'JO123456789',
  quantity: 1,
  price: 20,
  requestExtension: {
    originalDate: '2023-10-19T07:42:24.451Z',
    newDate: '2023-10-20T07:42:24.451Z',
    days: 1,
    reason: 'I want to deliver a very good job',
    deliveryDateUpdate: '2023-10-20T07:42:24.451Z'
  },
  serviceFee: 0,
  requirements: '',
  approved: false,
  cancelled: false,
  delivered: false,
  approvedAt: '',
  deliveredWork: [],
  dateOrdered: '',
  events: {
    placeOrder: '',
    requirements: '',
    orderStarted: '',
    deliveryDateUpdate: '',
    orderDelivered: '',
    buyerReview: '',
    sellerReview: ''
  }
};
