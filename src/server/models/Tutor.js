import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  rate: Number,
  availability: String,
});
const tutorSchema = new mongoose.Schema(
  {
    // Linked user account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic info
    fullName: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    avatar: { type: String, default: null }, // /uploads/avatar/filename.jpg
    bio: { type: String, default: "" },
    phone: { type: String,},

    // Professional details
    subjects: [subjectSchema],
    experience: { type: Number, default: 0 }, // years
    qualification: { type: String },
    hourlyRate: { type: Number, default: 0 },

    // Certificates and proofs
    certificates: [{ type: String }], // /uploads/certificates/filename.pdf
    proofs: [{ type: String }], // /uploads/proofs/filename.pdf

    // Connected students
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],

    // Chats, Meetings, and other connections
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meeting" }],

    // Profile status
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Tutor", tutorSchema);
