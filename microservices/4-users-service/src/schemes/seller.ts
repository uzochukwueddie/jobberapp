import Joi, { ObjectSchema } from 'joi';

const sellerSchema: ObjectSchema = Joi.object().keys({
  fullName: Joi.string().required().messages({
    'string.base': 'Fullname must be of type string',
    'string.empty': 'Fullname is required',
    'any.required': 'Fullname is required'
  }),
  _id: Joi.string().optional(),
  id: Joi.string().optional(),
  username: Joi.string().optional(),
  profilePublicId: Joi.string().optional().allow(null, ''),
  email: Joi.string().optional(),
  profilePicture: Joi.string().required().messages({
    'string.base': 'Please add a profile picture',
    'string.empty': 'Profile picture is required',
    'any.required': 'Profile picture is required'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Please add a seller description',
    'string.empty': 'Seller description is required',
    'any.required': 'Seller description is required'
  }),
  country: Joi.string().required().messages({
    'string.base': 'Please select a country',
    'string.empty': 'Country field is required',
    'any.required': 'Country field is required'
  }),
  oneliner: Joi.string().required().messages({
    'string.base': 'Please add your oneliner',
    'string.empty': 'Oneliner field is required',
    'any.required': 'Oneliner field is required'
  }),
  skills: Joi.array().items(Joi.string()).required().min(1).messages({
    'string.base': 'Please add at least one skill',
    'string.empty': 'Skills are required',
    'any.required': 'Skills are required',
    'array.min': 'Please add at least one skill'
  }),
  languages: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().optional(),
        language: Joi.string(),
        level: Joi.string()
      })
    )
    .required()
    .min(1)
    .messages({
      'string.base': 'Please add at least one language',
      'string.empty': 'Languages are required',
      'any.required': 'Languages are required',
      'array.min': 'Please add at least one language'
    }),
  responseTime: Joi.number().required().greater(0).messages({
    'string.base': 'Please add a response time',
    'string.empty': 'Response time is required',
    'any.required': 'Response time is required',
    'number.greater': 'Response time must be greater than zero'
  }),
  experience: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().optional(),
        company: Joi.string(),
        title: Joi.string(),
        startDate: Joi.string(),
        endDate: Joi.string(),
        description: Joi.string(),
        currentlyWorkingHere: Joi.boolean()
      })
    )
    .required()
    .min(1)
    .messages({
      'string.base': 'Please add at least one work experience',
      'string.empty': 'Experience is required',
      'any.required': 'Experience is required',
      'array.min': 'Please add at least one work experience'
    }),
  education: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().optional(),
        country: Joi.string(),
        university: Joi.string(),
        title: Joi.string(),
        major: Joi.string(),
        year: Joi.string()
      })
    )
    .required()
    .min(1)
    .messages({
      'string.base': 'Please add at least one education',
      'string.empty': 'Education is required',
      'any.required': 'Education is required',
      'array.min': 'Please add at least one education'
    }),
  socialLinks: Joi.array().optional().allow(null, ''),
  certificates: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().optional(),
        name: Joi.string(),
        from: Joi.string(),
        year: Joi.number()
      })
    )
    .optional()
    .allow(null, ''),
  ratingsCount: Joi.number().optional(),
  ratingCategories: Joi.object({
    five: { value: Joi.number(), count: Joi.number() },
    four: { value: Joi.number(), count: Joi.number() },
    three: { value: Joi.number(), count: Joi.number() },
    two: { value: Joi.number(), count: Joi.number() },
    one: { value: Joi.number(), count: Joi.number() }
  }).optional(),
  ratingSum: Joi.number().optional(),
  recentDelivery: Joi.string().optional().allow(null, ''),
  ongoingJobs: Joi.number().optional(),
  completedJobs: Joi.number().optional(),
  cancelledJobs: Joi.number().optional(),
  totalEarnings: Joi.number().optional(),
  totalGigs: Joi.number().optional(),
  createdAt: Joi.string().optional()
});

export { sellerSchema };
