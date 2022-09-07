import Product from "../Models/Product.js";
import cloudinary from "../config/cloudinaryConfig.js";

const createProduct = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.file.path);
  let file = result.secure_url;
  try {
    let result = await Product.create({ ...req.body, image: file });

    res.status(201).send(result);
  } catch (er) {
    res.status(400).send(er.message);
  }
};

const getProducts = async (req, res) => {

  try {
    let result = await Product.find();
    // res.status(401)
    // throw new Error("Not Authorized")
    res.status(200).send(result);
  } catch (error) {
    // res.status(401).send("Not Authorized")
    res.status(400).send(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    let result = await Product.findById(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export { createProduct, getProducts, getProduct };
