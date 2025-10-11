import React, { useState } from "react";
import "../styles/Profile.css";

export default function CompleteProfile() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "male",
    bio: "",
    idProof: null,
    certificate: null,
  });

  const [subjects, setSubjects] = useState([""]);
  const [rateType, setRateType] = useState("monthly");
  const [rate, setRate] = useState("");

  // handle input changes for step 1 & 2
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, ""]);
  };

  const handleSubjectChange = (index, value) => {
    const updated = [...subjects];
    updated[index] = value;
    setSubjects(updated);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log({
      ...formData,
      subjects,
      rateType,
      rate,
    });
    alert("Profile completed successfully!");
  };

  return (
    <div className="profileContainer">
      <h2 className="profileTitle">
        {step === 1
          ? "Complete Your Profile"
          : step === 2
          ? "Verify Your Profile"
          : "Subjects & Pricing"}
      </h2>

      <p className="profileSubtitle">
        {step === 1
          ? "Help us know you better and personalize your experience."
          : step === 2
          ? "Upload your documents to build trust with students."
          : "Add your subjects, expertise, and pricing details."}
      </p>

      {/* Step Progress Buttons */}
      <div className="profileSteps">
        <button className={step === 1 ? "activeStep" : ""}>Basic Info</button>
        <button className={step === 2 ? "activeStep" : ""}>Verification</button>
        <button className={step === 3 ? "activeStep" : ""}>Subjects & Pricing</button>
      </div>

      {/* STEP 1: Basic Info */}
      {step === 1 && (
        <div className="profileCard">
          <div className="avatarSection">
            <div className="avatarCircle"></div>
            <p>Edit</p>
          </div>

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />

          <label>Gender</label>
          <div className="genderGroup">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>

          <label>Short Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short bio"
          ></textarea>

          <div className="buttonRow">
            <button className="primaryBtn" onClick={nextStep}>
              Continue
            </button>
            <button className="secondaryBtn">Skip</button>
          </div>
        </div>
      )}

      {/* STEP 2: Verification */}
      {step === 2 && (
        <div className="verificationStep">
          <div className="docCard">
            <h3>Government ID Proof</h3>
            <p>(Aadhar, Passport, Driver’s License)</p>
            <label className="uploadBtn">
              Upload Document
              <input
                type="file"
                name="idProof"
                accept=".jpg,.png,.pdf"
                onChange={handleChange}
                hidden
              />
            </label>
          </div>

          <div className="docCard">
            <h3>Educational Certificate</h3>
            <p>(Degree, Diploma, or Marksheet)</p>
            <label className="uploadBtn">
              Upload Document
              <input
                type="file"
                name="certificate"
                accept=".jpg,.png,.pdf"
                onChange={handleChange}
                hidden
              />
            </label>
          </div>

          <div className="buttonRow">
            <button className="secondaryBtn" onClick={prevStep}>
              Back
            </button>
            <button className="primaryBtn" onClick={nextStep}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Subjects & Pricing */}
      {step === 3 && (
        <div className="profileCard pricingSection">
          <label>Subjects</label>
          {subjects.map((subject, index) => (
            <input
              key={index}
              type="text"
              value={subject}
              onChange={(e) => handleSubjectChange(index, e.target.value)}
              placeholder={`Subject ${index + 1}`}
            />
          ))}
          <button className="addMoreBtn" onClick={handleAddSubject}>
            + Add More
          </button>

          <label>Availability</label>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                name="rateType"
                value="monthly"
                checked={rateType === "monthly"}
                onChange={(e) => setRateType(e.target.value)}
              />
              Monthly
            </label>
            <label>
              <input
                type="radio"
                name="rateType"
                value="weekly"
                checked={rateType === "weekly"}
                onChange={(e) => setRateType(e.target.value)}
              />
              Weekly
            </label>
          </div>

          <label>
            Set Your {rateType.charAt(0).toUpperCase() + rateType.slice(1)} Rate
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter rate"
          />
          <p className="noteText">Competitive rates attract more students</p>

          <div className="buttonRow">
            <button className="secondaryBtn" onClick={prevStep}>
              Back
            </button>
            <button className="primaryBtn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
