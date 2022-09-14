import mongoose, { Schema } from 'mongoose';

const Product = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inventory: {
    type: Number,
    required: true
  }
})

export default Product