import express from "express";
import { authenticateHeader } from "../config/checkHeaderKeys.js";
import upload from "../config/multerConfig.js";
import {
  createProduct,
  getProduct,
  getProducts,
} from "../Controller/ProductController.js";
const Route = express.Router();

Route.post(
  "/createProduct",
  upload.single("image"),
  authenticateHeader,
  createProduct
);
Route.get("/getProducts", authenticateHeader, getProducts);
Route.get("/:id", authenticateHeader, getProduct);
export default Route;
