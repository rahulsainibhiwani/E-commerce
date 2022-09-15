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
    req.headers.secret_key !==
      "sk_JJ8voENYTUv8W96IpItK7JrEFEgAV6VPWSRYuJL7fDBHQUdE0EpVJjGUy+6Y3Slq4dmKmg==" ||
    req.headers.publish_key !==
      "pk_G+uNOVb5C0u4N6eFLvtKC4t9ovydQtt7yCaNT0VmWcJDSVBpDY5iWCypryftSqRMkLl9e2E="
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
