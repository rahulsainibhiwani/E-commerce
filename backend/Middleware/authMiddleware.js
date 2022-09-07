import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../Models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let result = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.person = await User.findById(result.id).select("-password");
      next();
    } catch (error) {
      res.status(400)
      throw new Error("Session has expired Please Login First");
    }
  } else {
    res.status(400)
    throw new Error("Not Authorized, No token");
  }
});
