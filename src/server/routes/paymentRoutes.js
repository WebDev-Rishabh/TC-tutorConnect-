import express from "express";
import { uploadPayment, getPaymentDetails } from "../controllers/paymentController.js";
import { uploadPaymentProof } from "../middlewares/paymentUpload.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Upload payment proof
router.post(
  "/upload",
  protect,
  uploadPaymentProof.single("proof"), // 'proof' field name from frontend
  uploadPayment
);

// ✅ Get payment details
router.get("/:studentId", protect, getPaymentDetails);

export default router;
