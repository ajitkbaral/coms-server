const express = require("express");
const Customer = require("../model/Customer");
const Order = require("../model/Order");

const router = express.Router();

router.get("/", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const customers = await Customer.find();
  if (!page || !limit) res.json(customers);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultCustomers = customers.slice(startIndex, endIndex);

  res.json(resultCustomers);
});

router.post("/", async (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImage: req.body.profileImage,
    location: { type: "Point", coordinates: req.body.location },
  });
  const savedCustomer = await customer.save();
  res.send(savedCustomer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id });
  const orders = await Order.find({ customer: customer })
    .select("createdAt products")
    .populate("products");
  res.json({ customer, orders });
});

module.exports = router;
