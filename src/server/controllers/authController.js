// src/server/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "mysecretkey", {
    expiresIn: "7d",
  });
};

// Register User (Student/Tutor)
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, subjects, experience } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      fullName,
      email,
      password,
      role,
      subjects,
      experience,
    });

    const token = generateToken(newUser._id);
    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user._id, role: user.role, fullName: user.fullName } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};