import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MySubjects.css";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";

export default function MySubjects() {
  const [subjects, setSubjects] = useState([]);
  const [tutorName, setTutorName] = useState("");
  const [tutorId, setTutorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSubject, setEditingSubject] = useState(null);
  const [addingSubject, setAddingSubject] = useState(false); // ✅ new modal toggle
  const [formData, setFormData] = useState({
    name: "",
    availability: "",
    rate: "",
  });

  const token = localStorage.getItem("authorization");

  // ✅ Fetch tutor data and subjects
  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.tutor) {
        setTutorName(res.data.tutor.fullName || "Tutor");
        setSubjects(res.data.tutor.subjects || []);
        setTutorId(res.data.tutor._id); 
      } else {
        setSubjects([]);
      }
    } catch (err) {
      console.error("Error fetching subjects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // 🗑 Remove subject
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(subjects.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error removing subject:", err);
    }
  };

  // ✏️ Edit subject modal
  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      availability: subject.availability,
      rate: subject.rate,
    });
  };

  // ➕ Open add subject modal
  const handleAddSubject = () => {
    setAddingSubject(true);
    setFormData({ name: "", availability: "", rate: "" });
  };

  // 🧾 Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Update subject
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/subjects/${editingSubject._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSubjects((prev) =>
        prev.map((s) =>
          s._id === editingSubject._id ? { ...s, ...formData } : s
        )
      );
      setEditingSubject(null);
    } catch (err) {
      console.error("Error updating subject:", err);
    }
  };

  // ✅ Add new subject
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/tutor/${tutorId}/subjects`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      

      fetchSubjects(); // refresh subjects
      setAddingSubject(false);
    } catch (err) {
      console.error("Error adding subject:", err);
    }
  };

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div className="mySubjectsContainer">
      <h2 className="welcomeText">
        Welcome Back, <span>{tutorName}!</span>
      </h2>
      <p className="subtitle">
        Track your teaching subjects, manage classes, and monitor earnings in one place.
      </p>

      <div className="subjectsTable">
        <div className="tableHeader">
          <div>Subject</div>
          <div>Rate (₹)</div>
          <div>Batch Duration</div>
          <div>Action</div>
        </div>

        {subjects.length === 0 ? (
          <p className="noSubjects">No subjects added yet.</p>
        ) : (
          subjects.map((subject) => (
            <div className="tableRow" key={subject._id}>
              <div>{subject.name}</div>
              <div>₹{subject.rate}</div>
              <div>{subject.availability}</div>
              <div className="actionIcons">
                <FaEdit
                  className="editIcon"
                  title="Edit"
                  onClick={() => handleEdit(subject)}
                />
                <FaTrashAlt
                  className="deleteIcon"
                  title="Remove"
                  onClick={() => handleRemove(subject._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Add Subject Button */}
      <button className="addMoreBtn" onClick={handleAddSubject}>
        <FaPlus /> Add Subject
      </button>

      {/* ✏️ Edit Modal */}
      {editingSubject && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Edit Subject</h3>
            <form onSubmit={handleUpdateSubmit}>
              <label>Subject Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Choose the batch (Weekly/Monthly)</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>

              <label>Choose your fee</label>
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
              />

              <div className="modalButtons">
                <button type="submit" className="submitBtn">
                  Update
                </button>
                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => setEditingSubject(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ➕ Add Subject Modal */}
      {addingSubject && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Add New Subject</h3>
            <form onSubmit={handleAddSubmit}>
              <label>Subject Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Batch Duration</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>

              <label>Rate (₹)</label>
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
              />

              <div className="modalButtons">
                <button type="submit" className="submitBtn">
                  Add
                </button>
                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => setAddingSubject(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
