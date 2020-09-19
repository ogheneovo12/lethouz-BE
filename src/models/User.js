import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    isSeller: {
      type: Number,
      default: 0,
    },
    profileImage: String,
    profileVideo: String,
    savedApartments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Apartment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
