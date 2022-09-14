import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
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
  },
  link: {
    type: String
  }
})

export default mongoose.model("Product", schema)