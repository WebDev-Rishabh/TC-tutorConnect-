// src/server/models/Pricing.js
import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true, trim: true },
    batchType: { type: String, enum: ["Weekly", "Monthly"], required: true },
    fee: { type: Number, required: true },
    notes: { type: String }, // optional
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Pricing = mongoose.model("Pricing", pricingSchema);
export default Pricing;
