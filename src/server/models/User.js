// src/server/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "tutor"], required: true },
    subjects: { type: [String], default: [] },
    experience: { type: Number, default: 0 },
    phone: String,
    gender: { type: String, default: "male" },
    bio: String,
    avatar: { type: String, default: "/uploads/avatars/default.png" },
    idProof: String,
    certificate: String,
    rateType: { type: String, enum: ["monthly", "weekly"], default: "monthly" },
    rate: Number,
  }, { timestamps: true });


// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password (for login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
