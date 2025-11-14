import Tutor from "../models/Tutor.js";

// 🟢 Get all subjects for logged-in tutor
export const getMySubjects =async (req, res) => {
  try {
    console.log("profile route")
    const Tutor = (await import("../models/Tutor.js")).default;
    const tutor = await Tutor.findOne({ userId: req.user._id });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.status(200).json({ subjects: tutor.subjects });
  } catch (err) {
    console.error("❌ Error fetching subjects:", err);
    res.status(500).json({ message: "Server error while fetching subjects" });
  }
};

// 🟢 Add a new subject
export const addSubject = async (req, res) => {
  try {
    const { name, rate, availability } = req.body;
    const tutor = await Tutor.findById(req.user.id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    tutor.subjects.push({ name, rate, availability });
    await tutor.save();

    res.status(201).json({ message: "Subject added", subjects: tutor.subjects });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟡 Update a subject
export const updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { name, rate, availability } = req.body;
    const tutor = await Tutor.findById(req.user.id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    const subject = tutor.subjects.id(subjectId);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    subject.name = name || subject.name;
    subject.rate = rate || subject.rate;
    subject.availability = availability || subject.availability;

    await tutor.save();
    res.json({ message: "Subject updated", subjects: tutor.subjects });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔴 Delete a subject
export const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const tutor = await Tutor.findById(req.user.id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    tutor.subjects = tutor.subjects.filter(
      (subj) => subj._id.toString() !== subjectId
    );
    await tutor.save();

    res.json({ message: "Subject deleted", subjects: tutor.subjects });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
