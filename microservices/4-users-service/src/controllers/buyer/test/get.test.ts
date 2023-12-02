import { Request, Response } from 'express';
import { authUserPayload, buyerDocument, buyerMockRequest, buyerMockResponse } from '@users/controllers/buyer/test/mocks/buyer.mock';
import * as buyer from '@users/services/buyer.service';
import { currentUsername, email, username } from '@users/controllers/buyer/get';

jest.mock('@users/services/buyer.service');
jest.mock('@uzochukwueddie/jobber-shared');
jest.mock('@elastic/elasticsearch');

describe('Buyer Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('email method', () => {
    it('should return buyer profile data', async () => {
      const req: Request = buyerMockRequest({}, authUserPayload) as unknown as Request;
      const res: Response = buyerMockResponse();
      jest.spyOn(buyer, 'getBuyerByEmail').mockResolvedValue(buyerDocument);

      await email(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Buyer profile', buyer: buyerDocument });
    });
  });

  describe('currentUser method', () => {
    it('should return buyer profile data', async () => {
      const req: Request = buyerMockRequest({}, authUserPayload) as unknown as Request;
      const res: Response = buyerMockResponse();
      jest.spyOn(buyer, 'getBuyerByUsername').mockResolvedValue(buyerDocument);

      await currentUsername(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Buyer profile', buyer: buyerDocument });
    });
  });

  describe('username method', () => {
    it('should return buyer profile data', async () => {
      const req: Request = buyerMockRequest({}, authUserPayload, { username: 'Manny' }) as unknown as Request;
      const res: Response = buyerMockResponse();
      jest.spyOn(buyer, 'getBuyerByUsername').mockResolvedValue(buyerDocument);

      await username(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Buyer profile', buyer: buyerDocument });
    });
  });
});
