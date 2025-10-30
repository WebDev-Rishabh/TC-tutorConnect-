import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, gender, bio, subjects, rateType, rate } = req.body;
    const updateData = { fullName, phone, gender, bio, rateType, rate };

    if (subjects) updateData.subjects = JSON.parse(subjects);
    if (req.files?.avatar)
      updateData.avatar = `/uploads/avatars/${req.files.avatar[0].filename}`;
    if (req.files?.idProof)
      updateData.idProof = `/uploads/documents/${req.files.idProof[0].filename}`;
    if (req.files?.certificate)
      updateData.certificate = `/uploads/documents/${req.files.certificate[0].filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};
