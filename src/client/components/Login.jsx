// src/pages/Login.jsx
import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.email || !formData.password) {
      return setMessage("Please enter both email and password.");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save JWT token and user role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        setMessage("✅ Login successful!");

        // Redirect based on role
        setTimeout(() => {
          if (data.user.role === "tutor" || data.user.role === "teacher") {
            navigate("/tutor/Dashboard");
          } else {
            navigate("/profile");
          }
        }, 1000);
      } else {
        setMessage(data.message || "Login failed. Check credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error, try again later.");
    }
  };

  return (
    <div className="loginPage">
      <h2 className="loginHeading">Welcome Back</h2>
      <p className="loginSubtext">Log in to continue learning or teaching.</p>

      <form className="loginForm" onSubmit={handleSubmit}>
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
        <button type="submit" className="loginBtn">
          Login
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
