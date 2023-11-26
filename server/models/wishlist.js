const mongoose = require('mongoose');

const wlSchema = new mongoose.Schema({
  wishlistID: { type: Number, unique: true },
  userID:{ 
    type : Number,
    required: true,
    },
   artsID:{ 
        type : Number,
        required: true,
    },
});

const wishlist = mongoose.model('wishlist', wlSchema);
module.exports = wishlist ;