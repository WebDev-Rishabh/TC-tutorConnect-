import express from "express";
import multer from "multer";
import path from "path";
import {
  createTutor,
  addSubject,
  updateSubject,
  deleteSubject,
  getAllTutors,
  getTutorById,
  uploadTutorFiles,
  updateTutorEarnings,
  updateProfile,
} from "../controllers/tutorController.js";
import { verifyTutor } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ----------------------- MULTER CONFIGURATION ----------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "avatar") cb(null, "uploads/avatar/");
    else if (file.fieldname === "certificates") cb(null, "uploads/certificates/");
    else if (file.fieldname === "proofs") cb(null, "uploads/proofs/");
    else cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* ----------------------- TUTOR CORE ROUTES ----------------------- */

// ✅ Create new tutor profile
router.post("/create", createTutor);

// ✅ Update profile (basic info + avatar)
router.put(
  "/profile/update",
  verifyTutor,
  upload.single("avatar"),
  updateProfile
);

// ✅ Get current logged-in tutor profile (with user populated)
router.get("/me", verifyTutor, async (req, res) => {
  try {
    const Tutor = (await import("../models/Tutor.js")).default;
    const tutor = await Tutor.findOne({ userId: req.user.id }).populate(
      "userId",
      "fullName email role avatar bio"
    );

    if (!tutor) {
      return res.status(404).json({ message: "Tutor profile not found" });
    }

    res.status(200).json({ tutor });
  } catch (err) {
    console.error("❌ Error fetching tutor profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ----------------------- SUBJECT ROUTES ----------------------- */
// ✅ All must come BEFORE /:id to prevent conflicts

// Add new subject for a tutor
router.post("/:tutorId/subjects", verifyTutor, addSubject);

// Update an existing subject
router.put("/:tutorId/subjects/:subjectId", verifyTutor, updateSubject);

// Delete a subject
router.delete("/:tutorId/subjects/:subjectId", verifyTutor, deleteSubject);

/* ----------------------- UPLOADS & EARNINGS ----------------------- */

// ✅ File uploads (avatar, certificates, proofs)
router.post(
  "/:tutorId/upload",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "certificates", maxCount: 5 },
    { name: "proofs", maxCount: 5 },
  ]),
  uploadTutorFiles
);

// ✅ Update tutor earnings (admin/payments)
router.put("/:tutorId/earnings", updateTutorEarnings);

/* ----------------------- GETTERS ----------------------- */

// ✅ Get all tutors
router.get("/", getAllTutors);

// ✅ Get single tutor by ID (must be last to avoid route collision)
router.get("/:id", getTutorById);

export default router;
