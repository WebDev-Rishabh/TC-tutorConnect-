import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "male",
    bio: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/default-avatar.png");

  const [idProofFile, setIdProofFile] = useState(null);
  const [idProofName, setIdProofName] = useState("");

  const [certificateFile, setCertificateFile] = useState(null);
  const [certificateName, setCertificateName] = useState("");

  const [subjects, setSubjects] = useState([""]);
  const [rateType, setRateType] = useState("monthly");
  const [rate, setRate] = useState("");

  // Fetch current profile (protected)
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return; // not logged in
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data;
        // Prefill basic fields
        setFormData((prev) => ({
          ...prev,
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          gender: user.gender || "male",
          bio: user.bio || "",
        }));

        if (user.avatar) {
          // backend should expose avatar path like /uploads/avatars/xxx.jpg
          setAvatarPreview(`http://localhost:5000${user.avatar}`);
        }

        if (user.idProof) setIdProofName(user.idProof.split("/").pop());
        if (user.certificate) setCertificateName(user.certificate.split("/").pop());

        setSubjects(user.subjects && user.subjects.length ? user.subjects : [""]);
        setRateType(user.rateType || "monthly");
        setRate(user.rate || "");
      } catch (err) {
        console.error("Fetch profile error:", err);
        // no fatal — user may be new
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Generic text / radio change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Avatar selection (preview + file)
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Id proof & certificate
  const handleIdProofChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIdProofFile(file);
    setIdProofName(file.name);
  };
  const handleCertificateChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCertificateFile(file);
    setCertificateName(file.name);
  };

  // Subjects array helpers
  const handleSubjectChange = (index, value) => {
    const copy = [...subjects];
    copy[index] = value;
    setSubjects(copy);
  };
  const addSubject = () => setSubjects((s) => [...s, ""]);
  const removeSubject = (index) => setSubjects((s) => s.filter((_, i) => i !== index));

  // Navigation
  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  // Final submit (PUT multipart/form-data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
  
      if (!token) {
        alert("You are not logged in!");
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const res = await axios.put(
        "http://localhost:5000/api/profile/update",
        formData,
        config
      );
  
      console.log("Profile updated:", res.data);
      alert("Profile updated successfully!");
  
      // ✅ Redirect after success
      if (role === "tutor") {
        window.location.href = "/tutor/dashboard";
      } else {
        window.location.href = "/";
      }
  
    } catch (err) {
      console.error("Profile save error:", err);
      alert("Error updating profile.");
    }
  };
  

  return (
    <div className="profileContainer">
      <h2 className="profileTitle">
        {step === 1 ? "Complete Your Profile" : step === 2 ? "Verify Your Profile" : "Subjects & Pricing"}
      </h2>

      <p className="profileSubtitle">
        {step === 1
          ? "Help us know you better and personalize your experience."
          : step === 2
          ? "Upload your documents to build trust with students."
          : "Add your subjects, expertise, and pricing details."}
      </p>

      <div className="profileSteps">
        <button className={step === 1 ? "activeStep" : ""} onClick={() => setStep(1)}>Basic Info</button>
        <button className={step === 2 ? "activeStep" : ""} onClick={() => setStep(2)}>Verification</button>
        <button className={step === 3 ? "activeStep" : ""} onClick={() => setStep(3)}>Subjects & Pricing</button>
      </div>

      {message && (
        <div className={`profileMessage ${message.type === "error" ? "err" : "ok"}`}>
          {message.text}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="profileCard">
          <div className="avatarSection">
            <div className="avatarPreviewWrap">
              <img src={avatarPreview} alt="avatar" className="avatarPreviewImg" />
            </div>
            <label className="uploadAvatarBtn">
              Upload Avatar
              <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
            </label>
          </div>

          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />

          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" />

          <label>Phone Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />

          <label>Gender</label>
          <div className="genderGroup">
            {["male", "female", "other"].map((g) => (
              <label key={g}>
                <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          <label>Short Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Write a short bio" />

          <div className="buttonRow">
            <button className="primaryBtn" onClick={nextStep} disabled={loading}>Continue</button>
            <button className="secondaryBtn" onClick={() => { setFormData({ fullName: "", email: "", phone: "", gender: "male", bio: "" }); }}>Skip</button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="verificationStep">
          <div className="docCard">
            <h3>Government ID Proof</h3>
            <p>(Aadhar, Passport, Driver’s License)</p>
            <label className="uploadBtn">
              {idProofName || "Upload Document"}
              <input type="file" name="idProof" accept=".jpg,.png,.pdf" onChange={handleIdProofChange} hidden />
            </label>
            {idProofName && <p className="fileName">{idProofName}</p>}
          </div>

          <div className="docCard">
            <h3>Educational Certificate</h3>
            <p>(Degree, Diploma, or Marksheet)</p>
            <label className="uploadBtn">
              {certificateName || "Upload Document"}
              <input type="file" name="certificate" accept=".jpg,.png,.pdf" onChange={handleCertificateChange} hidden />
            </label>
            {certificateName && <p className="fileName">{certificateName}</p>}
          </div>

          <div className="buttonRow">
            <button className="secondaryBtn" onClick={prevStep} disabled={loading}>Back</button>
            <button className="primaryBtn" onClick={nextStep} disabled={loading}>Continue</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="profileCard pricingSection">
          <label>Subjects</label>
          {subjects.map((sub, idx) => (
            <div key={idx} className="subjectRow">
              <input type="text" value={sub} onChange={(e) => handleSubjectChange(idx, e.target.value)} placeholder={`Subject ${idx + 1}`} />
              {subjects.length > 1 && <button className="removeSubBtn" onClick={() => removeSubject(idx)}>−</button>}
            </div>
          ))}
          <button className="addMoreBtn" onClick={addSubject}>+ Add More</button>

          <label>Availability</label>
          <div className="radioGroup">
            <label>
              <input type="radio" name="rateType" value="monthly" checked={rateType === "monthly"} onChange={() => setRateType("monthly")} />
              Monthly
            </label>
            <label>
              <input type="radio" name="rateType" value="weekly" checked={rateType === "weekly"} onChange={() => setRateType("weekly")} />
              Weekly
            </label>
          </div>

          <label>Set Your {rateType.charAt(0).toUpperCase() + rateType.slice(1)} Rate</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Enter rate" />
          <p className="noteText">Competitive rates attract more students</p>

          <div className="buttonRow">
            <button className="secondaryBtn" onClick={prevStep} disabled={loading}>Back</button>
            <button className="primaryBtn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
