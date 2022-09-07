import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const connectDb = async () => {
  try {
    let result = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb Connected Successfully`.cyan.underline);
  } catch (error) {
    console.log(`${error.message}`.red.underline.bold);
  }
};
export default connectDb;
