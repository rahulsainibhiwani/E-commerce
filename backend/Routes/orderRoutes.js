import express from "express";
import { authenticateHeader } from "../config/checkHeaderKeys.js";
import {
  addOrderItems,
  getAllOrdersList,
  getMyOrders,
  getOrderDetail,
  updateOrderToPaid,
} from "../Controller/orderController.js";
import { admin, authMiddleware } from "../Middleware/authMiddleware.js";
const orderRoute = express.Router();
orderRoute.route("/").post(authenticateHeader, authMiddleware, addOrderItems);
orderRoute
  .route("/orderDetail/:id")
  .get(authenticateHeader, authMiddleware, getOrderDetail);
orderRoute
  .route("/pay/:id")
  .put(authenticateHeader, authMiddleware, updateOrderToPaid);
orderRoute
  .route("/myorders")
  .get(authenticateHeader, authMiddleware, getMyOrders);
orderRoute
  .route("/AllOrders")
  .get(authenticateHeader, authMiddleware, admin, getAllOrdersList);
export default orderRoute;
