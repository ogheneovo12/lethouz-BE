const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  priviledges: {
    type: String,
    default: "regular-user",
  },
  savedApartments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      //ref: "Apartment",
    },
  ],
  profileImage: {
    type: String,
    required: false,
    default: null,
  },
  joined: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
