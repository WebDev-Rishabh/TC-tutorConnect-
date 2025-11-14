import Student from "../models/Student.js";

// ✅ Upload and Save Payment Proof
export const uploadPayment = async (req, res) => {
  try {
    const { studentId, amount } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No payment proof uploaded" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Save payment info
    student.payment = {
      proof: `/uploads/payment/${req.file.filename}`,
      amount,
      status: "completed",
      date: new Date(),
    };

    await student.save();

    res.status(200).json({
      message: "Payment proof uploaded successfully",
      payment: student.payment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading payment", error: error.message });
  }
};

// ✅ Fetch payment info for a student
export const getPaymentDetails = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).select("payment");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student.payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment details", error: error.message });
  }
};

