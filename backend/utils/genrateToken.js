import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { unixTimestamp } from "../config/helper.js";
dotenv.config();

export const genrateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  const time = unixTimestamp();
  return {
    token,
    time,
  };
};
