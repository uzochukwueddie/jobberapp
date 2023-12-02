import { getDocumentCount } from '@gig/elasticsearch';
import { gigCreateSchema } from '@gig/schemes/gig';
import { createGig } from '@gig/services/gig.service';
import { BadRequestError, ISellerGig, uploads } from '@uzochukwueddie/jobber-shared';
import { UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const gigCreate = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(gigCreateSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Create gig() method');
  }
  const result: UploadApiResponse = await uploads(req.body.coverImage) as UploadApiResponse;
  if (!result.public_id) {
    throw new BadRequestError('File upload error. Try again.', 'Create gig() method');
  }
  const count: number = await getDocumentCount('gigs');
  const gig: ISellerGig = {
    sellerId: req.body.sellerId,
    username: req.currentUser!.username,
    email: req.currentUser!.email,
    profilePicture: req.body.profilePicture,
    title: req.body.title,
    description: req.body.description,
    categories: req.body.categories,
    subCategories: req.body.subCategories,
    tags: req.body.tags,
    price: req.body.price,
    expectedDelivery: req.body.expectedDelivery,
    basicTitle: req.body.basicTitle,
    basicDescription: req.body.basicDescription,
    coverImage: `${result?.secure_url}`,
    sortId: count + 1
  };
  const createdGig: ISellerGig = await createGig(gig);
  res.status(StatusCodes.CREATED).json({ message: 'Gig created successfully.', gig: createdGig });
};

export { gigCreate };
