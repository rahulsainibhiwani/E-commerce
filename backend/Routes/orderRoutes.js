import express from "express";
import {
  addOrderItems,
  getAllOrdersList,
  getMyOrders,
  getOrderDetail,
  updateOrderToPaid,
} from "../Controller/orderController.js";
import { admin, authMiddleware } from "../Middleware/authMiddleware.js";
const orderRoute = express.Router();
orderRoute.route("/").post(authMiddleware, addOrderItems);
orderRoute.route("/orderDetail/:id").get(authMiddleware, getOrderDetail);
orderRoute.route("/pay/:id").put(authMiddleware, updateOrderToPaid);
orderRoute.route("/myorders").get(authMiddleware, getMyOrders);
orderRoute.route("/AllOrders").get(authMiddleware, admin, getAllOrdersList);
export default orderRoute;
