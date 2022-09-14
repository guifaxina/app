import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/userRouter";
import mongoose from "mongoose";
import adminRouter from './routes/adminRouter'
import cors from 'cors'
const app = express();

app.use(cors({
  origin:'http://127.0.0.1:5173',
  exposedHeaders: ['authorization', 'isadmin', 'name']
})
)

mongoose.connect(process.env.MONGO_CONNECTION_URI, (error) => {
  if (!error) console.log("Successfully connected to mongoDB. 🍃");
  else console.log(error);
});

app.get('/', (req, res) => {
  res.send("Something (get)")
})


app.use("/user", userRouter);
app.use('/admin', adminRouter);


app.listen(process.env.PORT, () => {
  console.log(`⚡ Server running on ${process.env.PORT} port.`);
});
