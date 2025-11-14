import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subjects: [{ type: String }],
    enrolledTutors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tutor" }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],

    // ✅ Payment info
    payment: {
      proof: { type: String }, // file path like /uploads/payment/filename.jpg
      amount: { type: Number, default: 0 },
      status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
      date: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
