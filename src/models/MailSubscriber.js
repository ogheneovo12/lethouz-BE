import { Schema, model } from "mongoose";

export default model(
  "MailSubscriber",
  new Schema(
    {
      email: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
