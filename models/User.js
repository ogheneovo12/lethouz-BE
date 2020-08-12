const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  joined: {
    type: Date,
    required: Date.now()
  }
})

const User = mongoose.model('users',UserSchema);

module.exports = User;