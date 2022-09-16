import {
  createUser,
  deleteUser,
  getUsers,
} from "../Controller/userController.js";

import { authenticateHeader } from "../config/checkHeaderKeys.js";
import express from "express";
import {
  authUser,
  deleteUserByAdmin,
  getAUserByAdmin,
  getUserProfile,
  updateUserByAdmin,
  updateUserProfile,
} from "../Controller/authController.js";
import { admin, authMiddleware } from "../Middleware/authMiddleware.js";
const userRoute = express.Router();
userRoute.route("/createUser").post(authenticateHeader, createUser);
userRoute
  .route("/getUsers")
  .get(authenticateHeader, authMiddleware, admin, getUsers);
userRoute.post("/login", authenticateHeader, authUser);
userRoute
  .route("/profile")
  .get(authenticateHeader, authMiddleware, getUserProfile)
  .put(authenticateHeader, authMiddleware, updateUserProfile);
userRoute
  .route("/deleteUser/:id")
  .delete(authenticateHeader, authMiddleware, admin, deleteUserByAdmin);
userRoute
  .route("/admin/getAUser/:id")
  .get(authenticateHeader, authMiddleware, admin, getAUserByAdmin);
userRoute
  .route("/admin/updateAUser/:id")
  .put(authenticateHeader, authMiddleware, admin, updateUserByAdmin);

export default userRoute;
