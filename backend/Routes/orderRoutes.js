import express from "express";
import {
  addOrderItems,
  getOrderDetail,
} from "../Controller/orderController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const orderRoute = express.Router();
orderRoute.route("/").post(authMiddleware, addOrderItems);
orderRoute.route("/orderDetail/:id").get(authMiddleware, getOrderDetail);
export default orderRoute;
