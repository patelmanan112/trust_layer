const mongoose = require("mongoose");

const ROLES = ["admin", "client", "freelancer", "arbitrator"];

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ROLES, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User, ROLES };

