import bcrypt from "bcrypt";
import User from "../Models/User.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { genrateToken } from "../utils/genrateToken.js";
dotenv.config();

export const authUser=expressAsyncHandler( async (req, res) => {
  const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if( user&& (await bcrypt.compare(password,user.password))){
    res.json({
        id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        isVerified:user.isVerified,
        token:genrateToken(user._id)
    })
  }else{
    res.status(401)
    throw new Error("Invalid Email or Password")
  }
    }
);

export const getUserProfile = async (req, res) => {
    const user=await User.findById(req.person._id);
  if(user){
    res.send({
        id:user.id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        isVerified:user.isVerified
    })
  }else{
    res.status(404)
    throw new Error("User Not Found")
  }
};
export const updateUserProfile = async (req, res) => {
    const user=await User.findById(req.person.id);
  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
       const salt = await bcrypt.genSalt(10);
       const hash = await bcrypt.hash(req.body.password, salt);
       user.password = hash;
    }
   const updatedUser= await user.save()
    res.send({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified
    })
  }else{
    res.status(404)
    throw new Error("User Not Found")
  }
};
