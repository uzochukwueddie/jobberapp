/* eslint-disable @typescript-eslint/no-explicit-any */
import { array, number, object, ObjectSchema, string } from 'yup';

import { ICreateGig } from '../interfaces/gig.interface';

const gigInfoSchema: ObjectSchema<ICreateGig | any> = object({
  sellerId: string().optional(),
  profilePicture: string().optional(),
  title: string().max(80, { title: 'Gig title must be at most 80' }).required({ title: 'Gig title is a required field' }),
  categories: string()
    .notOneOf(['Select a category'], { categories: 'Select a category' })
    .required({ categories: 'Categories is a required field' }),
  description: string()
    .max(1200, { description: 'Description must be at most 1200' })
    .required({ description: 'Description is a required field' }),
  coverImage: string().required({ coverImage: 'Gig cover image is a required field' }),
  expectedDelivery: string()
    .notOneOf(['Expected delivery'], { expectedDelivery: 'Select expected delivery' })
    .required({ expectedDelivery: 'Gig expected delivery is a required field' }),
  basicDescription: string()
    .max(100, { basicDescription: 'Gig basic description must be at most 100' })
    .required({ basicDescription: 'Gig basic description is a required field' }),
  basicTitle: string()
    .max(40, { basicTitle: 'Gig basic title must be at most 40' })
    .required({ basicTitle: 'Gig basic title is a required field' }),
  subCategories: array(string()).min(1, { subCategories: 'Subcategory is a required field' }),
  tags: array(string()).min(1, { tags: 'Tags is a required field' }),
  price: number().min(5, { price: 'Price is a required field' })
});

export { gigInfoSchema };
