import express from "express";
import multer from "multer";
import path from "path";
import {
  updateProfile,
  getProfile,
  editProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import { protect, authMiddleware, verifyTutor } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Multer setup
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
router.get("/me", protect, getProfile);
router.get("/subjects/me", verifyTutor, async (req, res) => {
  try {
    console.log("profile route")
    const Tutor = (await import("../models/Tutor.js")).default;
    const tutor = await Tutor.findOne({ userId: req.user._id });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.status(200).json({ subjects: tutor.subjects });
  } catch (err) {
    console.error("❌ Error fetching subjects:", err);
    res.status(500).json({ message: "Server error while fetching subjects" });
  }
});

router.put(
  "/profile/update",
  authMiddleware,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  updateProfile
);



// ✳️ Edit Basic Info
router.put("/edit", authMiddleware, editProfile);

// 🔴 Delete Profile
router.delete("/delete", authMiddleware, deleteProfile);

export default router;
