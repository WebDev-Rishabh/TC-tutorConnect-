import express from "express";
import multer from "multer";
import path from "path";
import { updateProfile, getProfile } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup for avatars & docs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "avatar") cb(null, "uploads/avatars/");
    else cb(null, "uploads/documents/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/me", authMiddleware, getProfile);
router.put(
  "/update",
  authMiddleware,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  updateProfile
);

export default router;
