const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  streetName: { type: String, required: true },
  pincode: { type: Number, required: true },
});

module.exports = mongoose.model('User', userSchema);
