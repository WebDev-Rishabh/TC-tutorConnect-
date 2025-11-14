import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authorization");

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

  const [subjects, setSubjects] = useState([
    { name: "", rate: "", availability: "monthly" },
  ]);

  const [tutorData, setTutorData] = useState(null);

  // Fetch current profile (protected)
  useEffect(() => {
    const fetchProfile = async () => {
     
      if (!token) return; // not logged in
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
          },
        });
  
        console.log("Fetched profile:", res.data);
  
        const user = res.data.user;
        const tutor = res.data.tutor;
        setTutorData(tutor);
  
        if (!user) return;
  
        // Prefill basic user fields
        setFormData((prev) => ({
          ...prev,
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          gender: user.gender || "male",
          bio: tutor?.bio || "",
        }));
  
        if (user.avatar) {
          const avatarPath = user.avatar.startsWith("http")
            ? user.avatar
            : `http://localhost:5000${user.avatar}`;
          setAvatarPreview(avatarPath);
        }
        console.log("Avatar preview set to:", avatarPreview);

        if (tutor?.idProof) setIdProofName(tutor.idProof.split("/").pop());
        if (tutor?.certificate)
          setCertificateName(tutor.certificate.split("/").pop());
  
        setSubjects(tutor?.subjects?.length ? tutor.subjects : [""]);
        
      } catch (err) {
        console.error("Fetch profile error:", err);
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

  
  
  
  const addSubject = () =>
    setSubjects((prev) => [...prev, { name: "", rate: "", availability: "monthly" }]);
  
  const removeSubject = (index) =>
    setSubjects((prev) => prev.filter((_, i) => i !== index));

  // Navigation
  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  // Final submit (PUT multipart/form-data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authorization");
      const role = localStorage.getItem("role");
      const subjectData = subjects.map((s) => ({
        _id: s._id || undefined,  // allow existing or new
        name: s.name,
        rate: s.rate,
        availability: s.availability,
      }));
      if (!token) {
        alert("You are not logged in!");
        return;
      }
  
      // ✅ Create real FormData
      const data = new FormData();
  
      // Basic user info
      data.append("fullName", formData.fullName || "");
      data.append("phone", formData.phone || "");
      data.append("bio", formData.bio || "");
      data.append("qualification", formData.qualification || "");
      data.append("experience", formData.experience || "");
      data.append("hourlyRate", formData.hourlyRate || "");
  
      data.append("subjects", JSON.stringify(subjectData));
      // Files (only append if selected)
      if (avatarFile) data.append("avatar", avatarFile);
      if (idProofFile) data.append("idProof", idProofFile);
      if (certificateFile) data.append("certificate", certificateFile);
  
      // ✅ Send multipart/form-data
      const res = await axios.put(
        "http://localhost:5000/api/profile/profile/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Profile updated:", res.data);
      alert("Profile updated successfully!");
  
      // Redirect
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
    <img
      src={avatarPreview || "/default-avatar.png"}
      alt="Avatar Preview"
      className="avatar-preview"
    />
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
    {/* ID Proof */}
    <div className="docCard">
      <h3>Government ID Proof</h3>
      <p>(Aadhar, Passport, Driver’s License)</p>

      <label className="uploadBtn">
        {idProofName || "Upload Document"}
        <input
          type="file"
          name="idProof"
          accept=".jpg,.png,.pdf"
          onChange={handleIdProofChange}
          hidden
        />
      </label>

      {idProofName && <p className="fileName">{idProofName}</p>}

      {/* ✅ Download existing document if available */}
      {tutorData?.proofs?.length > 0 && (
        <a
          href={`http://localhost:5000/${tutorData.proofs[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="downloadBtn"
        >
          Download
        </a>
      )}
    </div>

    {/* Educational Certificate */}
    <div className="docCard">
      <h3>Educational Certificate</h3>
      <p>(Degree, Diploma, or Marksheet)</p>

      <label className="uploadBtn">
        {certificateName || "Upload Document"}
        <input
          type="file"
          name="certificate"
          accept=".jpg,.png,.pdf"
          onChange={handleCertificateChange}
          hidden
        />
      </label>

      {certificateName && <p className="fileName">{certificateName}</p>}

      {/* ✅ Download existing certificate if available */}
      {tutorData?.certificates?.length > 0 && (
        <a
          href={`http://localhost:5000/${tutorData.certificates[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="downloadBtn"
        >
          Download
        </a>
      )}
    </div>

    {/* Buttons */}
    <div className="buttonRow">
      <button className="secondaryBtn" onClick={prevStep} disabled={loading}>
        Back
      </button>
      <button className="primaryBtn" onClick={nextStep} disabled={loading}>
        Continue
      </button>
    </div>
  </div>
)}


      {/* STEP 3 */}
      {step === 3 && (
        <div className="profileCard pricingSection">
  <h3>Add Subjects & Pricing</h3>

  {subjects.map((sub, idx) => (
    <div key={idx} className="subjectRowEnhanced">
      <div className="inputGroup">
        <label>Subject</label>
        <input
          type="text"
          placeholder="Enter subject name"
          value={sub.name || ""}
          onChange={(e) => {
            const updated = [...subjects];
            updated[idx].name = e.target.value;
            setSubjects(updated);
          }}
        />
      </div>

      <div className="inputGroup">
        <label>Rate (₹)</label>
        <input
          type="number"
          placeholder="e.g. 1000"
          value={sub.rate || ""}
          onChange={(e) => {
            const updated = [...subjects];
            updated[idx].rate = e.target.value;
            setSubjects(updated);
          }}
        />
      </div>

      <div className="inputGroup">
        <label>Batch Duration</label>
        <select
          value={sub.availability || "weekly"}
          onChange={(e) => {
            const updated = [...subjects];
            updated[idx].availability = e.target.value;
            setSubjects(updated);
          }}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <button className="removeSubjectBtn" onClick={() => removeSubject(idx)}>
        Remove
      </button>
    </div>
  ))}

  <button type="button" className="addMoreBtn" onClick={addSubject}>
    + Add More
  </button>

  <p className="noteText">
    You can add multiple subjects with different rates and availability.
  </p>

  <div className="buttonRow">
    <button className="secondaryBtn" onClick={prevStep} disabled={loading}>
      Back
    </button>
    <button className="primaryBtn" onClick={handleSubmit} disabled={loading}>
      {loading ? "Saving..." : "Save"}
    </button>
  </div>
</div>

)}

    </div>
  );
}
