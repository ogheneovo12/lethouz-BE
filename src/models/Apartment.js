import { Schema, model } from "mongoose";

const DetailsSchema = new Schema({
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  toilets: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
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
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
});

const ApartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    posted_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    location: {
      type: AddressSchema,
      required: true,
    },
    attachments: {
      type: [{ type: String }],
      required: true,
    },
    published: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Apartment", ApartmentSchema);
