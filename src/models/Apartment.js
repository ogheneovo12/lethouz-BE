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
  location: {
    type: { type: String },
    coordinates: [],
  },
});
AddressSchema.index({ location: "2dsphere" });

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
    address: {
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
