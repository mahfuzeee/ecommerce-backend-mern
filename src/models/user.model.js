const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // Hide by default
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
