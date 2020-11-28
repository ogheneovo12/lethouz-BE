import { Schema, model } from "mongoose";

const DetailsSchema = new Schema({
  bedrooms: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: String,
    required: true,
  },
  toilets: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const AddressSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  lga: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});
GeoSchema.index({ coordinates: "2dsphere" });

const ApartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    details: {
      type: DetailsSchema,
      required: true,
    },
    currentState: {
      type: String,
      required: true,
    },
    draft: {
      type: Number,
      default: 0,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    attachments: {
      type: [{ type: String }],
      required: false,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    geometry: GeoSchema,
    published: {
      type: Boolean,
      default: false,
    },
    posted_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ApartmentSchema.index({
  "geometry.coordinates": "2dsphere",
});
export default model("Apartment", ApartmentSchema);
