const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderID: { type: Number, unique: true },
  userID:{ 
    type : Number,
    required: true,
    },
   artsID:{ 
        type : Number,
        required: true,
    },
  orderDate: { 
    type : Date,
    default: Date.now(),
    required: true,
    },
  price: { 
    type : Number,
    required: true,
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    streetName: { type: String, required: true },
    pincode: { type: Number, required: true },
    status:{ type:Boolean, default:false},
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order ;
