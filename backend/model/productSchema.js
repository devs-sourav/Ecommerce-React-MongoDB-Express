const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0, // Default discount is 0
    min: 0,
    max: 100 // Assuming discount percentage
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0, // Default rating is 0
    min: 0,
    max: 5
  },
  brand: {
    type: String,
    required: true
 },
  status: {
    type: String,
    enum: ["InStock", "OutOFStock"],
    default: "InStock",
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  ownerId:{
    type:mongoose.Types.ObjectId,
    ref:'Category'
},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
