// controllers/TutorController.js
import Tutor from "../models/Tutor.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose"; // ✅ for ObjectId()

// ✅ Create a new tutor profile
export const createTutor = async (req, res) => {
  try {
    const { userId, fullName } = req.body;

    const existingTutor = await Tutor.findOne({ userId });
    if (existingTutor) {
      return res.status(400).json({ message: "Tutor profile already exists" });
    }

    const tutor = new Tutor({ userId, fullName });
    await tutor.save();

    res.status(201).json({ message: "Tutor profile created", tutor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add a subject to a tutor (each with its own _id)
export const addSubject = async (req, res) => {
    try {
      const { tutorId } = req.params;
      const { name, rate, availability } = req.body;
  
      const tutor = await Tutor.findById(tutorId);
      if (!tutor) return res.status(404).json({ message: "Tutor not found" });
  
      // ✅ Follow same structure as updateProfile
      const newSubject = {
        _id: new mongoose.Types.ObjectId(),
        name,
        rate,
        availability: availability || "weekly",
      };
  
      tutor.subjects.push(newSubject);
      await tutor.save();
  
      return res.status(200).json({
        message: "Subject added successfully",
        subjects: tutor.subjects,
      });
    } catch (error) {
      console.error("❌ Error adding subject:", error);
      return res.status(500).json({
        message: "Server error while adding subject",
        error: error.message,
      });
    }
  };
  

// ✅ Update a specific subject by ID
export const updateSubject = async (req, res) => {
    try {
      const { id } = req.params; // subject _id
      const { name, availability, rate } = req.body;
  
      const tutor = await Tutor.findOne({ "subjects._id": id });
      if (!tutor) return res.status(404).json({ message: "Tutor not found" });
  
      const subject = tutor.subjects.id(id);
      if (!subject) return res.status(404).json({ message: "Subject not found" });
  
      if (name) subject.name = name;
      if (availability) subject.availability = availability;
      if (rate) subject.rate = rate;
  
      await tutor.save();
  
      res.json({ message: "Subject updated successfully", subject });
    } catch (err) {
      console.error("Error updating subject:", err);
      res.status(500).json({ message: "Server error updating subject" });
    }
  };
  
  export const deleteSubject = async (req, res) => {
    try {
      const subjectId = req.params.id;
  
      // Find tutor with that subject
      const tutor = await Tutor.findOne({ "subjects._id": subjectId });
      if (!tutor) {
        return res.status(404).json({ message: "Tutor not found" });
      }
  
      // Filter out the subject (since .remove() no longer works)
      tutor.subjects = tutor.subjects.filter(
        (sub) => sub._id.toString() !== subjectId
      );
  
      await tutor.save();
  
      res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting subject:", error);
      res.status(500).json({
        message: "Server error while deleting subject",
        error: error.message,
      });
    }
  };
  

// ✅ Upload tutor files (avatar, certificates, proofs)
export const uploadTutorFiles = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    if (req.files?.avatar) {
      const result = await cloudinary.uploader.upload(req.files.avatar[0].path);
      tutor.avatar = result.secure_url;
    }

    if (req.files?.certificates) {
      const certUploads = await Promise.all(
        req.files.certificates.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        })
      );
      tutor.certificates.push(...certUploads);
    }

    if (req.files?.proofs) {
      const proofUploads = await Promise.all(
        req.files.proofs.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        })
      );
      tutor.proofs.push(...proofUploads);
    }

    await tutor.save();
    res.status(200).json({ message: "Files uploaded successfully", tutor });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
};

// ✅ Get all tutors
export const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find().populate("userId", "email role");
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get tutor by ID
export const getTutorById = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await Tutor.findById(id).populate("userId", "email role");
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update income or withdrawal (for later use)
export const updateTutorEarnings = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const { income, withdrawal } = req.body;

    const tutor = await Tutor.findById(tutorId);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    if (income) tutor.income += income;
    if (withdrawal) tutor.withdrawal += withdrawal;

    await tutor.save();
    res.status(200).json({ message: "Earnings updated", tutor });
  } catch (error) {
    res.status(500).json({ message: "Failed to update earnings", error: error.message });
  }
};

// ✅ Update full tutor profile
export const updateProfile = async (req, res) => {
  try {
    console.log("Updating profile...");

    const { fullName, bio, qualification, experience, gender, hourlyRate } = req.body;
    const files = req.files || {};

    const avatar = files.avatar ? files.avatar[0].path : undefined;
    const certificate = files.certificate ? files.certificate[0].path : undefined;
    const proof = files.proof ? files.proof[0].path : undefined;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.fullName = fullName;
    if (avatar) user.avatar = avatar;
    await user.save();

    if (user.role === "tutor") {
      let tutor = await Tutor.findOne({ userId: user._id });
      if (!tutor) return res.status(404).json({ message: "Tutor profile not found" });

      tutor.fullName = fullName || tutor.fullName;
      tutor.bio = bio || tutor.bio;
      tutor.qualification = qualification || tutor.qualification;
      tutor.experience = Number(experience) || tutor.experience;
      tutor.gender = gender || tutor.gender;
      tutor.hourlyRate = Number(hourlyRate) || tutor.hourlyRate;

      if (avatar) tutor.avatar = avatar;
      if (certificate) tutor.certificates.push(certificate);
      if (proof) tutor.proofs.push(proof);

      await tutor.save();

      return res.json({
        message: "Tutor profile updated successfully",
        user,
        tutor,
      });
    }

    res.json({ message: "Student profile updated successfully", user });
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ message: err.message });
  }
};
