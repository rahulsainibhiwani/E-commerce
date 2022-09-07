import products from "./data/Proshop/products.js";
import Product from "./Models/Product.js";
import asyncHandler from "express-async-handler";
import connectDB from "./connectDB.js";

connectDB();

const ImportData = asyncHandler(async () => {
  try {
    const data = products.map((product) => ({ ...product }));
    await Product.insertMany(data);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
const DestroyData = async () => {
  await Product.deleteMany();
  console.log("Data destroyed successfully");
  process.exit();
};

if (process.argv[2] === "-d") {
  DestroyData();
} else {
  ImportData();
}
