import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const uploader = cloudinary.v2;
uploader.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default uploader;
