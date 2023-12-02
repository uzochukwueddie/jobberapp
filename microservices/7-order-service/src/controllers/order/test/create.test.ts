/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import * as orderService from '@order/services/order.service';
import { authUserPayload, orderDocument, orderMockRequest, orderMockResponse } from '@order/controllers/order/test/mocks/order.mock';
import { intent, order } from '@order/controllers/order/create';
import { orderSchema } from '@order/schemes/order';
import { BadRequestError, IOrderDocument } from '@uzochukwueddie/jobber-shared';

jest.mock('@order/services/order.service');
jest.mock('@uzochukwueddie/jobber-shared');
jest.mock('@order/schemes/order');
jest.mock('@elastic/elasticsearch');

const mockPaymentIntentsCreate = jest.fn();
const mockCustomersSearch = jest.fn();
jest.mock('stripe', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      paymentIntents: {
        create: (...args: any) => mockPaymentIntentsCreate(...args) as unknown,
      },
      customers: {
        search: (...args: any) => mockCustomersSearch(...args) as unknown,
      },
    }))
  };
});

describe('Order Controller', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('intent method', () => {
    it('should create a new intent and return the corrct response', async () => {
      const req: Request = orderMockRequest({}, orderDocument, authUserPayload) as unknown as Request;
      const res: Response = orderMockResponse();
      mockCustomersSearch.mockResolvedValueOnce({ data: [{ id: '12236362' }]});
      mockPaymentIntentsCreate.mockResolvedValueOnce({ client_secret: '123443', id: '23485848' });
      await intent(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Order intent created successfully.',
        clientSecret: '123443',
        paymentIntentId: '23485848'
      });
    });
  });

  describe('order method', () => {
    it('should throw an error for invalid schema data', async () => {
      const req: Request = orderMockRequest({}, orderDocument, authUserPayload) as unknown as Request;
      const res: Response = orderMockResponse();
      jest.spyOn(orderSchema, 'validate').mockImplementation((): any =>
        Promise.resolve({
          error: {
            name: 'ValidationError',
            isJoi: true,
            details: [{ message: 'This is an error message' }]
          }
        })
      );

      order(req, res).catch(() => {
        expect(BadRequestError).toHaveBeenCalledWith('This is an error message', 'Create order() method');
      });
    });

    it('should return correct json response', async () => {
      const req: Request = orderMockRequest({}, orderDocument, authUserPayload) as unknown as Request;
      const res: Response = orderMockResponse();
      const serviceFee: number = req.body.price < 50 ? (5.5 / 100) * req.body.price + 2 : (5.5 / 100) * req.body.price;
      let orderData: IOrderDocument = req.body;
      orderData = { ...orderData, serviceFee };
      jest.spyOn(orderSchema, 'validate').mockImplementation((): any => Promise.resolve({error: {}}));
      jest.spyOn(orderService, 'createOrder').mockResolvedValue(orderData);

      await order(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Order created successfully.', order: orderData
      });
    });
  });
});
