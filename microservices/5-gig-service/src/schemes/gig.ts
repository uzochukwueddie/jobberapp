import Joi, { ObjectSchema } from 'joi';

const gigCreateSchema: ObjectSchema = Joi.object().keys({
  sellerId: Joi.string().required().messages({
    'string.base': 'Seller Id must be of type string',
    'string.empty': 'Seller Id is required',
    'any.required': 'Seller Id is required'
  }),
  profilePicture: Joi.string().required().messages({
    'string.base': 'Please add a profile picture',
    'string.empty': 'Profile picture is required',
    'any.required': 'Profile picture is required'
  }),
  title: Joi.string().required().messages({
    'string.base': 'Please add a gig title',
    'string.empty': 'Gig title is required',
    'any.required': 'Gig title is required'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Please add a gig description',
    'string.empty': 'Gig description is required',
    'any.required': 'Gig description is required'
  }),
  categories: Joi.string().required().messages({
    'string.base': 'Please select a category',
    'string.empty': 'Gig category is required',
    'any.required': 'Gig category is required'
  }),
  subCategories: Joi.array().items(Joi.string()).required().min(1).messages({
    'string.base': 'Please add at least one subcategory',
    'string.empty': 'Gig subcategories are required',
    'any.required': 'Gig subcategories are required',
    'array.min': 'Please add at least one subcategory'
  }),
  tags: Joi.array().items(Joi.string()).required().min(1).messages({
    'string.base': 'Please add at least one tag',
    'string.empty': 'Gig tags are required',
    'any.required': 'Gig tags are required',
    'array.min': 'Please add at least one tag'
  }),
  price: Joi.number().required().greater(4.99).messages({
    'string.base': 'Please add a gig price',
    'string.empty': 'Gig price is required',
    'any.required': 'Gig price is required',
    'number.greater': 'Gig price must be greater than $4.99'
  }),
  coverImage: Joi.string().required().messages({
    'string.base': 'Please add a cover image',
    'string.empty': 'Gig cover image is required',
    'any.required': 'Gig cover image is required',
    'array.min': 'Please add a cover image'
  }),
  expectedDelivery: Joi.string().required().messages({
    'string.base': 'Please add expected delivery',
    'string.empty': 'Gig expected delivery is required',
    'any.required': 'Gig expected delivery is required',
    'array.min': 'Please add a expected delivery'
  }),
  basicTitle: Joi.string().required().messages({
    'string.base': 'Please add basic title',
    'string.empty': 'Gig basic title is required',
    'any.required': 'Gig basic title is required',
    'array.min': 'Please add a basic title'
  }),
  basicDescription: Joi.string().required().messages({
    'string.base': 'Please add basic description',
    'string.empty': 'Gig basic description is required',
    'any.required': 'Gig basic description is required',
    'array.min': 'Please add a basic description'
  })
});

const gigUpdateSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.base': 'Please add a gig title',
    'string.empty': 'Gig title is required',
    'any.required': 'Gig title is required'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Please add a gig description',
    'string.empty': 'Gig description is required',
    'any.required': 'Gig description is required'
  }),
  categories: Joi.string().required().messages({
    'string.base': 'Please select a category',
    'string.empty': 'Gig category is required',
    'any.required': 'Gig category is required'
  }),
  subCategories: Joi.array().items(Joi.string()).required().min(1).messages({
    'string.base': 'Please add at least one subcategory',
    'string.empty': 'Gig subcategories are required',
    'any.required': 'Gig subcategories are required',
    'array.min': 'Please add at least one subcategory'
  }),
  tags: Joi.array().items(Joi.string()).required().min(1).messages({
    'string.base': 'Please add at least one tag',
    'string.empty': 'Gig tags are required',
    'any.required': 'Gig tags are required',
    'array.min': 'Please add at least one tag'
  }),
  price: Joi.number().required().greater(4.99).messages({
    'string.base': 'Please add a gig price',
    'string.empty': 'Gig price is required',
    'any.required': 'Gig price is required',
    'number.greater': 'Gig price must be greater than $4.99'
  }),
  coverImage: Joi.string().required().messages({
    'string.base': 'Please add a cover image',
    'string.empty': 'Gig cover image is required',
    'any.required': 'Gig cover image is required',
    'array.min': 'Please add a cover image'
  }),
  expectedDelivery: Joi.string().required().messages({
    'string.base': 'Please add expected delivery',
    'string.empty': 'Gig expected delivery is required',
    'any.required': 'Gig expected delivery is required',
    'array.min': 'Please add a expected delivery'
  }),
  basicTitle: Joi.string().required().messages({
    'string.base': 'Please add basic title',
    'string.empty': 'Gig basic title is required',
    'any.required': 'Gig basic title is required',
    'array.min': 'Please add a basic title'
  }),
  basicDescription: Joi.string().required().messages({
    'string.base': 'Please add basic description',
    'string.empty': 'Gig basic description is required',
    'any.required': 'Gig basic description is required',
    'array.min': 'Please add a basic description'
  })
});

export { gigCreateSchema, gigUpdateSchema };
