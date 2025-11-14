import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    role: { type: String, enum: ["student", "tutor"], required: true },
    avatar: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

// Hash password 
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", userSchema);
