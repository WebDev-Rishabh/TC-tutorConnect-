// src/pages/SignUp.jsx
import React, { useState } from "react";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [selectedForm, setSelectedForm] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    subjects: "",
    experience: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ======= STUDENT SUBMIT =======
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword)
      return setMessage("Passwords do not match.");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: "student",
          subjects: [formData.subjects],
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("🎉 Student Registered Successfully!");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error, please try again later.");
    }
  };

  // ======= TUTOR SUBMIT =======
  const handleTutorSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword)
      return setMessage("Passwords do not match.");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: "tutor",
          subjects: [formData.subjects],
          experience: Number(formData.experience),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("🎉 Tutor Registered Successfully!");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error, please try again later.");
    }
  };

  const handleBack = () => {
    setSelectedForm("");
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      subjects: "",
      experience: "",
    });
    setMessage("");
  };

  // ======= UI =======
  return (
    <div className="signUpPage">
      {selectedForm === "" && (
        <>
          <h2 className="signUpHeading">How would you like to join </h2>
          <h2 className="signUpHeading">TutorConnect?</h2>

          <div className="cardContainer">
            {/* Student Card */}
            <div className="signUpCard">
              <span>
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/pastel-glyph/64/student-male--v1.png"
                  alt="student"
                />
              </span>
              <h3>I want to Learn</h3>
              <p>Find trusted tutors for your learning journey.</p>
              <button onClick={() => setSelectedForm("student")} className="cardBtn">
                Signup as Student
              </button>
            </div>

            {/* Tutor Card */}
            <div className="signUpCard">
              <span>
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/fluency-systems-regular/48/teacher-hirring.png"
                  alt="tutor"
                />
              </span>
              <h3>I want to Teach</h3>
              <p>Share knowledge, inspire students, and earn money.</p>
              <button onClick={() => setSelectedForm("tutor")} className="cardBtn">
                Signup as Tutor
              </button>
            </div>
          </div>
        </>
      )}

      {/* ===== STUDENT FORM ===== */}
      {selectedForm === "student" && (
        <div className="formContainer">
          <h2 className="formHeading">Create Your Student Account</h2>
          <p className="formSubtext">
            Find verified tutors and start your learning journey today.
          </p>

          <form className="signUpForm" onSubmit={handleStudentSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <select
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              required
            >
              <option value="">Subjects of Interest</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
            </select>

            <button type="submit" className="cardBtn">
              Sign Up as Student
            </button>
          </form>

          {message && <p className="message">{message}</p>}

          <button className="backBtn" onClick={handleBack}>
            ← Back
          </button>
        </div>
      )}

      {/* ===== TUTOR FORM ===== */}
      {selectedForm === "tutor" && (
        <div className="formContainer">
          <h2 className="formHeading">Create Your Tutor Account</h2>
          <p className="formSubtext">
            Connect with students and share your expertise globally.
          </p>

          <form className="signUpForm" onSubmit={handleTutorSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subjects"
              placeholder="Subjects You Teach"
              value={formData.subjects}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />

            <button type="submit" className="cardBtn">
              Sign Up as Tutor
            </button>
          </form>

          {message && <p className="message">{message}</p>}

          <button className="backBtn" onClick={handleBack}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
