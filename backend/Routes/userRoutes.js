import {
  createUser,
  deleteUser,
  getUsers,
} from "../Controller/userController.js";
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
userRoute.route("/createUser").post(createUser);
userRoute.route("/getUsers").get(authMiddleware, admin, getUsers);
userRoute.post("/login", authUser);
userRoute
  .route("/profile")
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);
userRoute
  .route("/deleteUser/:id")
  .delete(authMiddleware, admin, deleteUserByAdmin);
userRoute
  .route("/admin/getAUser/:id")
  .get(authMiddleware, admin, getAUserByAdmin);
userRoute
  .route("/admin/updateAUser/:id")
  .put(authMiddleware, admin, updateUserByAdmin);

export default userRoute;
