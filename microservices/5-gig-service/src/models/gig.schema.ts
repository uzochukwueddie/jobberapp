import { ISellerGig } from '@uzochukwueddie/jobber-shared';
import mongoose, { Model, Schema, model } from 'mongoose';

const gigSchema: Schema = new Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, index: true },
    username: { type: String, required: true },
    profilePicture: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    basicTitle: { type: String, required: true },
    basicDescription: { type: String, required: true },
    categories: { type: String, required: true },
    subCategories: [{ type: String, required: true }],
    tags: [{ type: String }],
    active: { type: Boolean, default: true },
    expectedDelivery: { type: String, default: '' },
    ratingsCount: { type: Number, default: 0 },
    ratingSum: { type: Number, default: 0 },
    ratingCategories: {
      five: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
      four: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
      three: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
      two: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
      one: { value: { type: Number, default: 0 }, count: { type: Number, default: 0 }},
    },
    price: { type: Number, default: 0 },
    sortId: { type: Number },
    coverImage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: {
      transform(_doc, rec) {
        rec.id = rec._id;
        delete rec._id;
        return rec;
      }
    }
  }
);

gigSchema.virtual('id').get(function() {
  return this._id;
});

const GigModel: Model<ISellerGig> = model<ISellerGig>('Gig', gigSchema, 'Gig');
export { GigModel };
