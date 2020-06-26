const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const authRoute = require("./routes/auth");
const customerRoute = require("./routes/customer");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");

app.use(cors());
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://dropship:J5fgUJIKLQVRowBX@cluster0.4eo0i.mongodb.net/coms?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err);
    console.log("Connected To DB!");
  }
);

app.listen(port, () => console.log(`Server running at port ${port}`));

//Route Middlewares
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/customers", customerRoute);
app.use("/api/orders", orderRoute);
