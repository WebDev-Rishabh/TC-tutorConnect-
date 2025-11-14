// models/Meeting.js
import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    topic: String,
    date: Date,
    startTime: String,
    endTime: String,
    meetingLink: String, // could be Zoom/GoogleMeet/Jitsi
    status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", meetingSchema);
