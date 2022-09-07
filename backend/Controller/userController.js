import User from '../Models/User.js'
import bcrypt from 'bcrypt'
import { genrateToken } from '../utils/genrateToken.js'
import expressAsyncHandler from 'express-async-handler'

export const createUser = expressAsyncHandler(
    async (req, res) => {
        const { password, email } = req.body
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400)
            throw new Error("User already Exist")
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const result = await User.create({ ...req.body, password: hash })
        if (result) {
            res.status(201)
            res.json({
                id: result._id,
                name: result.name,
                email: result.email,
                isAdmin: result.isAdmin,
                isVerified: result.isVerified,
                token: genrateToken(result._id)
            })
        } else {
            req.status(400)
            throw new Error("Invalid User Data")
        }

    }
)

export const getUsers = async (req, res) => {
    try {
        const total = await User.find().count();
        const result = await User.find();
        res.status(200).send({ total, result })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}