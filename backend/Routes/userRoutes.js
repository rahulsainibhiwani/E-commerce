import {createUser,deleteUser,getUsers} from '../Controller/userController.js'
import express from 'express'
import { authUser, getUserProfile, updateUserProfile } from '../Controller/authController.js'
import { authMiddleware } from '../Middleware/authMiddleware.js'
const userRoute=express.Router()
userRoute.route('/createUser').post(createUser)
userRoute.route('/getUsers').get(getUsers)
userRoute.route('/deleteUser/:id').delete(deleteUser)
userRoute.post('/login',authUser)
userRoute.route('/profile').get(authMiddleware,getUserProfile).put(authMiddleware,updateUserProfile)
export default userRoute;
 