// src/server/routes/authRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Ensure upload folder exists
const uploadDir = "uploads/avatars";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only .jpg, .jpeg, .png files are allowed!"), false);
};

// Initialize Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// Routes
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);

export default router;
