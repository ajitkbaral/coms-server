const express = require("express");
const router = express.Router();
const Product = require("../model/Product");

router.get("/", async (req, res) => {
  const products = await Product.find();
  return res.send(products);
});

router.post("/", async (req, res) => {
  const product = new Product({
    name: p.name,
    description: p.description,
    productImage: p.productImage,
    price: p.price,
  });
  try {
    const savedProduct = product.save();
    res.send(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
