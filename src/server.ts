import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/userRouter";
import mongoose from "mongoose";

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_URI, (error) => {
  if (!error) console.log("Successfully connected to mongoDB. 🍃");
  else console.log(error);
});

app.get('/', (req, res) => {
  res.send("Something (get)")
})
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`⚡ Server running on ${process.env.PORT} port.`);
});
