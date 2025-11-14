import Tutor from "../models/Tutor.js";
import User from "../models/User.js";
import mongoose from "mongoose";


/**
 * ✅ GET: Fetch user + tutor profile
 */


export const getProfile = async (req, res) => {
  try {
    console.log("Fetching profile for user:", req.user._id);

    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    let tutor = null;
    if (user.role === "tutor") {
      tutor = await Tutor.findOne({ userId: user._id });
    }

    res.status(200).json({ user, tutor });
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

/**
 * ✅ PUT: Update profile (handles avatar, idProof, certificate for tutor)
 */
export const updateProfile = async (req, res) => {
  try {
    console.log("Updating profile...");
    const {
      fullName,
      bio,
      qualification,
      experience,
      phone,
      rateType,
      rate,
    } = req.body;

    const files = req.files || {};
    const avatar = files.avatar ? files.avatar[0].path : undefined;
    const idProof = files.idProof ? files.idProof[0].path : null;
    const certificate = files.certificate ? files.certificate[0].path : null;

    // ✅ Fetch the logged-in user
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Update base user data
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;
    await user.save();

    // ✅ Handle tutor-specific data
    if (user.role === "tutor") {
      let tutor = await Tutor.findOne({ userId: user._id });
      if (!tutor) {
        tutor = new Tutor({ userId: user._id, fullName });
      }

      tutor.fullName = fullName || tutor.fullName;
      tutor.bio = bio || tutor.bio;
      tutor.qualification = qualification || tutor.qualification;
      tutor.experience = experience || tutor.experience;
      tutor.rateType = rateType || tutor.rateType;
      tutor.rate = rate || tutor.rate;
      if (avatar) tutor.avatar = avatar;
      if (idProof) tutor.proofs.push(idProof);
      if (certificate) tutor.certificates.push(certificate);

      // ✅ Handle subjects (parse safely even if Buffer)
      if (req.body.subjects) {
        let parsedSubjects = [];
        try {
          // Handle if Buffer or String
          const str =
            Buffer.isBuffer(req.body.subjects)
              ? req.body.subjects.toString()
              : req.body.subjects;
          parsedSubjects = JSON.parse(str);
        } catch (err) {
          console.error("Subjects JSON parse error:", err);
        }

        // Ensure subjects have unique _id for future CRUD ops
        tutor.subjects = parsedSubjects.map((sub) => ({
          _id: sub._id || new mongoose.Types.ObjectId(),
          name: sub.name,
          rate: sub.rate,
          availability: sub.availability || "weekly",
        }));
      }

      // ✅ Save tutor after all updates
      await tutor.save();

      return res.status(200).json({
        message: "Tutor profile updated successfully",
        tutor,
      });
    }

    // ✅ If user is a student
    res.status(200).json({
      message: "Student profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("❌ Profile update error:", err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};



/**
 * ✅ PUT: Edit profile (basic info only)
 */
export const editProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({ message: "Profile info updated successfully", user });
  } catch (err) {
    console.error("❌ Edit profile error:", err);
    res.status(500).json({ message: "Server error while editing profile" });
  }
};

/**
 * ✅ DELETE: Delete profile (and associated tutor if applicable)
 */
export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "tutor") {
      await Tutor.deleteOne({ userId: user._id });
    }

    await User.deleteOne({ _id: user._id });

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error("❌ Delete profile error:", err);
    res.status(500).json({ message: "Server error while deleting profile" });
  }
};
