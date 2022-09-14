import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import connectDb from "./connectDB.js";
import ProductRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/errorMiddleware.js";
import userRoute from "./Routes/userRoutes.js";
import { authMiddleware } from "./Middleware/authMiddleware.js";
import orderRoute from "./Routes/orderRoutes.js";
import Validator from "node-input-validator";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();
connectDb();

app.use("/product", ProductRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use("/api/config/googleSiteKey", (req, res) =>
  res.send(process.env.REACT_APP_GOOGLE_SITE_KEY)
);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`.yellow.bold);
});
