import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },
  cep: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
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
    default: false,
  },
  id: {
    type: String,
  },
});

schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model("User", schema);
