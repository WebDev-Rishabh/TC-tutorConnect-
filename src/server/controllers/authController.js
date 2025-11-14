// src/server/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Tutor from "../models/Tutor.js";
import Student from "../models/Student.js";



// ===== Helper Function =====
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


// ===== REGISTER USER =====
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, gender, experience, qualification } = req.body;

    console.log("Incoming body:", req.body);
    console.log("File:", req.file);

    // ✅ Basic validation
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // ✅ Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user first
    const newUser = await User.create({
      fullName,
      email,
      password,
      role,
      avatar: req.file ? `/uploads/avatars/${req.file.filename}` : null,
    });

    // ✅ Create Tutor profile if role is tutor
    if (role === "tutor") {
      await Tutor.create({
        userId: newUser._id, // matches your schema
        fullName,
        gender: gender || "other",
        avatar: newUser.avatar,
        bio: "",
        subjects: [],
        experience: Number(experience) || 0,
        qualification: qualification || "",
        hourlyRate: 0,
        certificates: [],
        proofs: [],
        students: [],
        chats: [],
        meetings: [],
        isVerified: false,
        isActive: true,
      });
    }

    // ✅ Create Student profile if role is student
    if (role === "student") {
      await Student.create({
        userId: newUser._id,
        fullName,
        enrolledTutors: [],
        chats: [],
        payments: [],
      });
    }

    // ✅ Generate token
    const token = generateToken(newUser._id, newUser.role);

    // ✅ Send success response
    res.status(201).json({
      message: "User registered successfully",
      token,
      role: newUser.role,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        avatar: newUser.avatar,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ===== LOGIN USER =====


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });
    

    // ✅ Generate token
    const token = generateToken(user._id, user.role);

    // ✅ Get related profile (optional)
    let tutorProfile = null;
    let studentProfile = null;

    if (user.role === "tutor") {
      tutorProfile = await Tutor.findOne({ userId: user._id });
    } else if (user.role === "student") {
      studentProfile = await Student.findOne({ userId: user._id });
    }

    // ✅ Send response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      tutorProfile,
      studentProfile,
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

