import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/userRouter";
import mongoose from "mongoose";
import adminRouter from './routes/adminRouter'
import cors from 'cors'
const app = express();
import winston from 'winston';
import expressWinston from 'express-winston'

app.use(cors({
  origin: ['http://localhost:4173', 'http://localhost:5173'],
  exposedHeaders: ['authorization', 'isadmin', 'name']
})
)

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  colorize: true,
}))

mongoose.connect(process.env.MONGO_CONNECTION_URI, (error) => {
  if (!error) console.log("Successfully connected to mongoDB. 🍃");
  else console.log(error);
}); 

app.use("/user", userRouter);
app.use("/admin", adminRouter);


app.listen(process.env.PORT, () => {
  console.log(`⚡ Server running on ${process.env.PORT} port.`);
});
