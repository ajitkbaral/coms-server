const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const customerScheme = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    phoneNumber: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    profileImage: {
      type: String,
      required: true,
    },
    location: {
      type: pointSchema,
      index: "2dsphere",
      required: false,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerScheme);
