// models/Relationship.js
import mongoose from "mongoose";

const relationshipSchema = new mongoose.Schema(
  {
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "blocked", "ended"],
      default: "accepted",
    },
    lastInteraction: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Relationship", relationshipSchema);
