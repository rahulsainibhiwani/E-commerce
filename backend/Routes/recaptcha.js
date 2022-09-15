import express from "express";
import axios from "axios";
const route = express.Router();
route.post("/post", async (req, res) => {
  const { token } = req.body;
  const result = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_GOOGLE_SECRET_KEY}&response=${token}`
  );
  if (res.status(200)) {
    res.send(true);
  } else {
    res.send(false);
  }
});
export default route;
