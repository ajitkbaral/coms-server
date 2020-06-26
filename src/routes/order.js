const express = require("express");
const router = express.Router();
const Order = require("../model/Order");
const Customer = require("../model/Customer");

router.get("/", async (req, res) => {
  const orders = await Order.find().populate(["customer", "products"]);
  if (!orders) return res.status(400).send("Order Doesnot Exists");
  return res.send(orders);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate([
    "customer",
    "products",
  ]);
  if (!order) return res.status(400).send("Order Doesnot Exists");
  return res.send(order);
});

router.post("/", async (req, res) => {
  // Check if customer already exists in db
  const customer = await Customer.findOne({ _id: req.body.customerId });
  if (!customer) return res.status(400).send("Customer Doesnot Exists");
  const order = new Order({
    products: req.body.products,
    customer,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    total: req.body.totalAmount,
  });
  try {
    const savedOrder = await order.save();
    return res.send(savedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  const deletedOrder = await order.deleteOne();
  res.send(deletedOrder);
});

router.put("/:id", async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) return res.status(400).send("Order Doesnot Exists");
  try {
    const updatedOrder = await Order.updateOne(
      { _id: req.params.id },
      {
        products: req.body.products,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
      }
    );
    return res.send(updatedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
