import { Request, Response } from 'express';
import * as reviewService from '@review/services/review.service';
import { authUserPayload, reviewDocument, reviewMockRequest, reviewMockResponse } from '@review/controllers/test/mocks/review.mock';
import { review } from '@review/controllers/create';

jest.mock('@review/services/review.service');
jest.mock('@uzochukwueddie/jobber-shared');
jest.mock('@review/queues/connection');
jest.mock('@elastic/elasticsearch');

describe('Review Controller', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('review method', () => {
    it('should return the correct response', async () => {
      const req: Request = reviewMockRequest({}, reviewDocument, authUserPayload) as unknown as Request;
      const res: Response = reviewMockResponse();
      jest.spyOn(reviewService, 'addReview').mockResolvedValue(reviewDocument);

      await review(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Review created successfully.', review: reviewDocument });
    });
  });
});
