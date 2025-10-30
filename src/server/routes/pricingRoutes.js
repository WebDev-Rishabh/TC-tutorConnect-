// src/server/routes/pricingRoutes.js
import express from "express";
import {
  createPricing,
  getMyPricing,
  updatePricing,
  deletePricing,
} from "../controllers/pricingController.js";
import { verifyToken, verifyTutor } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected: must be authenticated tutors
router.post("/", verifyToken, verifyTutor, createPricing);
router.get("/", verifyToken, verifyTutor, getMyPricing);
router.put("/:id", verifyToken, verifyTutor, updatePricing);
router.delete("/:id", verifyToken, verifyTutor, deletePricing);

export default router;
