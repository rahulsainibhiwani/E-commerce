import { Validator } from "node-input-validator";
import {
  success,
  failed,
  error,
  unixTimestamp,
  fileUpload,
  checkValidation,
} from "./helper.js";
// import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
var secretKey = "secret";

export const authenticateHeader = async (req, res, next) => {
  // console.log(req.headers, "--------in header check------------");
  const v = new Validator(req.headers, {
    secret_key: "required|string",
    publish_key: "required|string",
  });

  let errorsResponse = await checkValidation(v);

  if (errorsResponse) {
    return failed(res, errorsResponse);
  }

  if (
    req.headers.secret_key !== process.env.secret_key ||
    req.headers.publish_key !== process.env.publish_key
  ) {
    return failed(res, "Key not matched!");
  }
  next();
};
export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;

      next();
    });
  } else {
    res.sendStatus(401);
  }
};
