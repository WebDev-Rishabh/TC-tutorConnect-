// models/TutorSubject.js
import mongoose from "mongoose";

const tutorSubjectSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    subjectName: { type: String, required: true },
    description: { type: String },
    priceType: { type: String, enum: ["weekly", "monthly"], default: "monthly" },
    price: { type: Number, required: true },
    level: { type: String }, // e.g. "Beginner", "Intermediate"
    duration: { type: String }, // optional: "3 months", etc.
  },
  { timestamps: true }
);

export default mongoose.model("TutorSubject", tutorSubjectSchema);
