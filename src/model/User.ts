import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  admin: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
  }
});

export default mongoose.model("User", schema)