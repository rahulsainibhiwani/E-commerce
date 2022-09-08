import expressAsyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";

export const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      user: req.person._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export const getOrderDetail = expressAsyncHandler(async (req, res) => {
  const orderDetail = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!orderDetail) {
    res.status(404);
    throw new Error("Order not Found");
  } else {
    res.json(orderDetail);
  }
});
