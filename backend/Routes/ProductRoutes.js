import express from "express";
import upload from "../config/multerConfig.js";
import {
  createProduct,
  getProduct,
  getProducts,
} from "../Controller/ProductController.js";
const Route = express.Router();

Route.post("/createProduct", upload.single("image"), createProduct);
Route.get("/getProducts", getProducts);
Route.get("/:id", getProduct);
export default Route;
