import express from "express";
import { updateSubject, deleteSubject, addSubject } from "../controllers/tutorController.js";
import { verifyTutor } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Add new subject


// ✅ Update a subject
router.put("/:id", verifyTutor, updateSubject);

// ✅ Delete a subject
router.delete("/:id", verifyTutor, deleteSubject);
router.post("/add", verifyTutor, addSubject);

export default router;
