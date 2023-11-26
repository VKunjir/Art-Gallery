const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartID: { type: Number, unique: true },
  userID:{ 
    type : Number,
    required: true,
    },
   artsID:{ 
        type : Number,
        required: true,
    },
  quantity: { 
    type : Number,
    default: 1,
    },
  price: { 
    type : Number,
    required: true,
    },
    image:{
      type:String,
      require: true
    }
});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart ;
