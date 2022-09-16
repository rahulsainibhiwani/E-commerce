import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { genrateToken } from "../utils/genrateToken.js";
import expressAsyncHandler from "express-async-handler";
import {
  success,
  failed,
  error,
  unixTimestamp,
  fileUpload,
  checkValidation,
} from "../config/helper.js";
import { Validator } from "node-input-validator";

export const createUser = expressAsyncHandler(async (req, res) => {
  let v = new Validator(req.body, {
    name: "required",
    email: "required|email",
    password: "required",
  });
  let values = JSON.parse(JSON.stringify(v));
  let errorsResponse = await checkValidation(v);

  if (errorsResponse) {
    return failed(res, errorsResponse);
  }

  const userExist = await User.findOne({ email: values.inputs.email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(values.inputs.password, salt);
  const result = await User.create({ ...values.inputs, password: hash });
  const Token = genrateToken(result._id);

  if (result) {
    res.status(201);
    res.json({
      id: result._id,
      name: result.name,
      email: result.email,
      isAdmin: result.isAdmin,
      isVerified: result.isVerified,
      Login_Time: (await Token).time,
      token: (await Token).token,
    });
  } else {
    req.status(400);
    throw new Error("Invalid User Data");
  }
});

export const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
