import { getReviewsByGigId, getReviewsBySellerId } from '@review/services/review.service';
import { IReviewDocument } from '@uzochukwueddie/jobber-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const reviewsByGigId = async (req: Request, res: Response): Promise<void> => {
  const reviews: IReviewDocument[] = await getReviewsByGigId(req.params.gigId);
  res.status(StatusCodes.OK).json({ message: 'Gig reviews by gig id', reviews });
};

export const reviewsBySellerId = async (req: Request, res: Response): Promise<void> => {
  const reviews: IReviewDocument[] = await getReviewsBySellerId(req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Gig reviews by seller id', reviews });
};
