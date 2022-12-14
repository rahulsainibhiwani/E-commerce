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

export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Get logged in user orderItems
// @route GET / order / myorders
// @access Private
export const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.person._id });
  if (orders) res.json(orders);
  else {
    res.status(404);
    throw new Error("Order List Empty");
  }
});

// @desc Get logged in user orderItems
// @route GET / order / myorders
// @access Private
export const getAllOrdersList = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (orders) res.json(orders);
  else {
    res.status(404);
    throw new Error("Order List Empty");
  }
});
