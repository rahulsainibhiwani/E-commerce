import express from "express";
import {
  addOrderItems,
  getOrderDetail,
  updateOrderToPaid,
} from "../Controller/orderController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
const orderRoute = express.Router();
orderRoute.route("/").post(authMiddleware, addOrderItems);
orderRoute.route("/orderDetail/:id").get(authMiddleware, getOrderDetail);
orderRoute.route("/pay/:id").put(authMiddleware, updateOrderToPaid);
export default orderRoute;
