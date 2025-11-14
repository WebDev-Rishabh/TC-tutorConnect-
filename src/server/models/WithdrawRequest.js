import mongoose from "mongoose";

const withdrawRequestSchema = new mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["bank", "upi", "paypal"],
      required: true,
    },
    paymentDetails: {
      type: String, // e.g. UPI ID or Bank Account info
    },
  },
  { timestamps: true }
);

const WithdrawRequest = mongoose.model("WithdrawRequest", withdrawRequestSchema);
export default WithdrawRequest;
