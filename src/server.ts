import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'

// Routes
import adminRouter from './routes/adminRouter'
import userRouter from "./routes/userRouter";

// Utils
import loggerHttp from "./utils/logger-http.utils";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
  origin: ['http://localhost:4173', 'http://localhost:5173', "https://arketfy.netlify.app"],
  exposedHeaders: ['authorization', 'isadmin', 'name']
}))

app.use(loggerHttp)

mongoose.connect(process.env.MONGO_CONNECTION_URI, (error) => {
  if (error) console.log(error);
  else console.log("Successfully connected to mongoDB. 🍃");
}); 

app.use("/user", userRouter);
app.use("/admin", adminRouter);


app.listen(PORT || 3001, () => {
  console.log(`⚡ Server running on ${process.env.PORT} port.`);
});
