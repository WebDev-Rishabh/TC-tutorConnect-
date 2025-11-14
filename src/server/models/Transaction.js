// models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
    amount: Number,
    type: { type: String, enum: ["earning", "withdrawal"], required: true },
    method: { type: String, enum: ["bank", "upi", "paypal"], default: "upi" },
    status: { type: String, enum: ["pending", "completed"], default: "completed" },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
