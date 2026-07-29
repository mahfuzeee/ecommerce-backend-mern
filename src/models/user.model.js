const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const loger = require("../utils/logger");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // Hide by default
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    addresses: {
      address: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    phone: { type: String },
    shippingAddress: {
      address: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Replace plain text with hash
  } catch (error) {
    loger.info({ err: error }, "Failed to hash password");
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
