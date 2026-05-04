const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // Hide by default
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true, versionKey: false },
);

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Replace plain text with hash
  } catch (error) {
    loger.info({ err: error }, "Failed to hash password");
  }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
