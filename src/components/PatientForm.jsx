import React, { useState } from "react";
import { getDB } from "../db/initDB";

const initialState = {
  fullName: "",
  dob: "",
  gender: "",
  maritalStatus: "",
  address: "",
  phone: "",
  email: "",
  reason: "",
  emergencyName: "",
  emergencyRelation: "",
  emergencyPhone: "",
  primaryInsurance: "",
  primaryPolicyholder: "",
  primaryPolicyNumber: "",
  primaryGroupNumber: "",
  secondaryPolicyholder: "",
  secondaryPolicyNumber: "",
  secondaryGroupNumber: "",
  physicianName: "",
  clinicName: "",
  physicianPhone: "",
};

const PatientForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.dob ||
      !formData.gender ||
      !formData.phone ||
      !formData.reason
    ) {
      setMessage("Please fill all mandatory fields marked with *");
      return false;
    }
    if (
      !formData.emergencyName ||
      !formData.emergencyRelation ||
      !formData.emergencyPhone
    ) {
      setMessage("Please complete all emergency contact fields");
      return false;
    }
    if (
      !/^\d{10}$/.test(formData.phone) ||
      !/^\d{10}$/.test(formData.emergencyPhone)
    ) {
      setMessage("Phone numbers must be 10 digits");
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;
    try {
      const db = await getDB();
      console.log("✅ Got DB connection");

      console.log("📝 Inserting data:", {
        fullName: formData.fullName,
        dob: formData.dob,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        reason: formData.reason,
        emergencyName: formData.emergencyName,
        emergencyRelation: formData.emergencyRelation,
        emergencyPhone: formData.emergencyPhone,
        primaryInsurance: formData.primaryInsurance,
        primaryPolicyholder: formData.primaryPolicyholder,
        primaryPolicyNumber: formData.primaryPolicyNumber,
        primaryGroupNumber: formData.primaryGroupNumber,
        secondaryPolicyholder: formData.secondaryPolicyholder,
        secondaryPolicyNumber: formData.secondaryPolicyNumber,
        secondaryGroupNumber: formData.secondaryGroupNumber,
        physicianName: formData.physicianName,
        clinicName: formData.clinicName,
        physicianPhone: formData.physicianPhone,
      });

      // await db.exec(`INSERT INTO patients (
      //   fullName, dob, gender, maritalStatus, address, phone, email, reason,
      //   emergencyName, emergencyRelation, emergencyPhone,
      //   primaryInsurance, primaryPolicyholder, primaryPolicyNumber, primaryGroupNumber,
      //   secondaryPolicyholder, secondaryPolicyNumber, secondaryGroupNumber,
      //   physicianName, clinicName, physicianPhone
      // ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      //   formData.fullName, formData.dob, formData.gender, formData.maritalStatus,
      //   formData.address, formData.phone, formData.email, formData.reason,
      //   formData.emergencyName, formData.emergencyRelation, formData.emergencyPhone,
      //   formData.primaryInsurance, formData.primaryPolicyholder, formData.primaryPolicyNumber, formData.primaryGroupNumber,
      //   formData.secondaryPolicyholder, formData.secondaryPolicyNumber, formData.secondaryGroupNumber,
      //   formData.physicianName, formData.clinicName, formData.physicianPhone
      // ]);
      await db.exec(
        `INSERT INTO patients (
        fullName, dob, gender, maritalStatus, address, phone, email, reason,
        emergencyName, emergencyRelation, emergencyPhone,
        primaryInsurance, primaryPolicyholder, primaryPolicyNumber, primaryGroupNumber,
        secondaryPolicyholder, secondaryPolicyNumber, secondaryGroupNumber,
        physicianName, clinicName, physicianPhone
      ) VALUES (
        '${formData.fullName.replace(/'/g, "''")}',
        '${formData.dob}',
        '${formData.gender}',
        '${formData.maritalStatus.replace(/'/g, "''")}',
        '${formData.address.replace(/'/g, "''")}',
        '${formData.phone}',
        '${formData.email.replace(/'/g, "''")}',
        '${formData.reason.replace(/'/g, "''")}',
        '${formData.emergencyName.replace(/'/g, "''")}',
        '${formData.emergencyRelation.replace(/'/g, "''")}',
        '${formData.emergencyPhone}',
        '${formData.primaryInsurance.replace(/'/g, "''")}',
        '${formData.primaryPolicyholder.replace(/'/g, "''")}',
        '${formData.primaryPolicyNumber.replace(/'/g, "''")}',
        '${formData.primaryGroupNumber.replace(/'/g, "''")}',
        '${formData.secondaryPolicyholder.replace(/'/g, "''")}',
        '${formData.secondaryPolicyNumber.replace(/'/g, "''")}',
        '${formData.secondaryGroupNumber.replace(/'/g, "''")}',
        '${formData.physicianName.replace(/'/g, "''")}',
        '${formData.clinicName.replace(/'/g, "''")}',
        '${formData.physicianPhone}'
      )`
      );
      const result = await db.query("SELECT * FROM patients");
      console.log("✅ Inserted patient data:", result);
      console.log("✅ Patient inserted successfully");

      setMessage("Patient registered successfully!");
      setFormData(initialState);
      window.dispatchEvent(new Event("patients-updated"));
    } catch (error) {
      console.error("❌ Error while inserting patient:", error);
      setMessage("Something went wrong while registering the patient.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title"> </h2>

        <fieldset>
          <legend>Patient Information</legend>
          <div className="form-row">
            <label>Full Name*:</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label>Date of Birth*:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Gender*:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <label>Marital Status:</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </div>
          <div className="form-row">
            <label>Address:</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Phone*:</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label>Email:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Emergency Contact*</legend>
          <div className="form-row">
            <label>Name*:</label>
            <input
              name="emergencyName"
              value={formData.emergencyName}
              onChange={handleChange}
              required
            />
            <label>Relation to Patient*:</label>
            <input
              name="emergencyRelation"
              value={formData.emergencyRelation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Phone*:</label>
            <input
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Insurance Information</legend>
          <div className="form-row">
            <label>Primary Insurance:</label>
            <input
              name="primaryInsurance"
              value={formData.primaryInsurance}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Policyholder's Name:</label>
            <input
              name="primaryPolicyholder"
              value={formData.primaryPolicyholder}
              onChange={handleChange}
            />
            <label>Policy Number:</label>
            <input
              name="primaryPolicyNumber"
              value={formData.primaryPolicyNumber}
              onChange={handleChange}
            />
            <label>Group Number:</label>
            <input
              name="primaryGroupNumber"
              value={formData.primaryGroupNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Secondary Policyholder:</label>
            <input
              name="secondaryPolicyholder"
              value={formData.secondaryPolicyholder}
              onChange={handleChange}
            />
            <label>Policy Number:</label>
            <input
              name="secondaryPolicyNumber"
              value={formData.secondaryPolicyNumber}
              onChange={handleChange}
            />
            <label>Group Number:</label>
            <input
              name="secondaryGroupNumber"
              value={formData.secondaryGroupNumber}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Primary Care Physician</legend>
          <div className="form-row">
            <label>Physician Name:</label>
            <input
              name="physicianName"
              value={formData.physicianName}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Clinic Name:</label>
            <input
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
            />
            <label>Phone:</label>
            <input
              name="physicianPhone"
              value={formData.physicianPhone}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Reason for Visit*</legend>
          <div className="form-row">
            <input
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>

        <button type="submit">Register Patient</button>
        {message && <p className="message">{message}</p>}
      </form>
    </>
  );
};

export default PatientForm;