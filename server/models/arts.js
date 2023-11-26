const mongoose = require('mongoose');

const artsSchema = new mongoose.Schema({
  artsID: { type: Number, unique: true },
  userID: {
    type: Number,
  },
  title: String,
  description: String,
  price: Number,
  style: String,
  dateCreated: Date,
  image: String, // Store path or URL to the image
});

module.exports = mongoose.model('arts', artsSchema);
