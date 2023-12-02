import { addDataToIndex, deleteIndexedData, getIndexedData, updateIndexedData } from '@gig/elasticsearch';
import { IRatingTypes, IReviewMessageDetails, ISellerDocument, ISellerGig } from '@uzochukwueddie/jobber-shared';
import { gigsSearchBySellerId } from '@gig/services/search.service';
import { GigModel } from '@gig/models/gig.schema';
import { publishDirectMessage } from '@gig/queues/gig.producer';
import { gigChannel } from '@gig/server';
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const getGigById = async (gigId: string): Promise<ISellerGig> => {
  const gig: ISellerGig = await getIndexedData('gigs', gigId);
  return gig;
};

const getSellerGigs = async (sellerId: string): Promise<ISellerGig[]> => {
  const resultsHits: ISellerGig[] = [];
  const gigs = await gigsSearchBySellerId(sellerId, true);
  for(const item of gigs.hits) {
    resultsHits.push(item._source as ISellerGig);
  }
  return resultsHits;
};

const getSellerPausedGigs = async (sellerId: string): Promise<ISellerGig[]> => {
  const resultsHits: ISellerGig[] = [];
  const gigs = await gigsSearchBySellerId(sellerId, false);
  for(const item of gigs.hits) {
    resultsHits.push(item._source as ISellerGig);
  }
  return resultsHits;
};

const createGig = async (gig: ISellerGig): Promise<ISellerGig> => {
  const createdGig: ISellerGig = await GigModel.create(gig);
  if (createdGig) {
    const data: ISellerGig = createdGig.toJSON?.() as ISellerGig;
    await publishDirectMessage(
      gigChannel,
      'jobber-seller-update',
      'user-seller',
      JSON.stringify({ type: 'update-gig-count', gigSellerId: `${data.sellerId}`, count: 1 }),
      'Details sent to users service.'
    );
    await addDataToIndex('gigs', `${createdGig._id}`, data);
  }
  return createdGig;
};

const deleteGig = async (gigId: string, sellerId: string): Promise<void> => {
  await GigModel.deleteOne({ _id: gigId }).exec();
  await publishDirectMessage(
    gigChannel,
    'jobber-seller-update',
    'user-seller',
    JSON.stringify({ type: 'update-gig-count', gigSellerId: sellerId, count: -1 }),
    'Details sent to users service.'
  );
  await deleteIndexedData('gigs', `${gigId}`);
};

const updateGig = async (gigId: string, gigData: ISellerGig): Promise<ISellerGig> => {
  const document: ISellerGig = await GigModel.findOneAndUpdate(
    { _id: gigId },
    {
      $set: {
        title: gigData.title,
        description: gigData.description,
        categories: gigData.categories,
        subCategories: gigData.subCategories,
        tags: gigData.tags,
        price: gigData.price,
        coverImage: gigData.coverImage,
        expectedDelivery: gigData.expectedDelivery,
        basicTitle: gigData.basicTitle,
        basicDescription: gigData.basicDescription
      }
    },
    { new: true }
  ).exec() as ISellerGig;
  if (document) {
    const data: ISellerGig = document.toJSON?.() as ISellerGig;
    await updateIndexedData('gigs', `${document._id}`, data);
  }
  return document;
};

const updateActiveGigProp = async (gigId: string, gigActive: boolean): Promise<ISellerGig> => {
  const document: ISellerGig = await GigModel.findOneAndUpdate(
    { _id: gigId },
    {
      $set: {
        active: gigActive
      }
    },
    { new: true }
  ).exec() as ISellerGig;
  if (document) {
    const data: ISellerGig = document.toJSON?.() as ISellerGig;
    await updateIndexedData('gigs', `${document._id}`, data);
  }
  return document;
};

const updateGigReview = async (data: IReviewMessageDetails): Promise<void> => {
  const ratingTypes: IRatingTypes = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
  };
  const ratingKey: string = ratingTypes[`${data.rating}`];
  const gig = await GigModel.findOneAndUpdate(
    { _id: data.gigId },
    {
      $inc: {
        ratingsCount: 1,
        ratingSum: data.rating,
        [`ratingCategories.${ratingKey}.value`]: data.rating,
        [`ratingCategories.${ratingKey}.count`]: 1,
      }
    },
    { new: true, upsert: true }
  ).exec();
  if (gig) {
    const data: ISellerGig = gig.toJSON?.() as ISellerGig;
    await updateIndexedData('gigs', `${gig._id}`, data);
  }
};

const seedData = async (sellers: ISellerDocument[], count: string): Promise<void> => {
  const categories: string[] = [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Data',
    'Business'
  ];
  const expectedDelivery: string[] = [
    '1 Day Delivery',
    '2 Days Delivery',
    '3 Days Delivery',
    '4 Days Delivery',
    '5 Days Delivery',
  ];
  const randomRatings = [
    { sum: 20, count: 4 },
    { sum: 10, count: 2 },
    { sum: 20, count: 4 },
    { sum: 15, count: 3 },
    { sum: 5, count: 1 },
  ];

  for(let i = 0; i < sellers.length; i++) {
    const sellerDoc: ISellerDocument = sellers[i];
    const title = `I will ${faker.word.words(5)}`;
    const basicTitle = faker.commerce.productName();
    const basicDescription = faker.commerce.productDescription();
    const rating = sample(randomRatings);
    const gig: ISellerGig = {
      profilePicture: sellerDoc.profilePicture,
      sellerId: sellerDoc._id,
      email: sellerDoc.email,
      username: sellerDoc.username,
      title: title.length <= 80 ? title : title.slice(0, 80),
      basicTitle: basicTitle.length <= 40 ? basicTitle : basicTitle.slice(0, 40),
      basicDescription: basicDescription.length <= 100 ? basicDescription : basicDescription.slice(0, 100),
      categories: `${sample(categories)}`,
      subCategories: [faker.commerce.department(), faker.commerce.department(), faker.commerce.department()],
      description: faker.lorem.sentences({ min: 2, max: 4 }),
      tags: [faker.commerce.product(), faker.commerce.product(), faker.commerce.product(), faker.commerce.product()],
      price: parseInt(faker.commerce.price({ min: 20, max: 30, dec: 0 })),
      coverImage: faker.image.urlPicsumPhotos(),
      expectedDelivery: `${sample(expectedDelivery)}`,
      sortId: parseInt(count, 10) + i + 1,
      ratingsCount: (i + 1) % 4 === 0 ? rating!['count'] : 0,
      ratingSum: (i + 1) % 4 === 0 ? rating!['sum'] : 0,
    };
    console.log(`***SEEDING GIG*** - ${i + 1} of ${count}`);
    await createGig(gig);
  }
};

export {
  getGigById,
  getSellerGigs,
  getSellerPausedGigs,
  createGig,
  deleteGig,
  updateGig,
  updateActiveGigProp,
  updateGigReview,
  seedData
};
