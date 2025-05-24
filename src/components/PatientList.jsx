import React, { useEffect, useState, useCallback } from "react";
import { getDB } from "../db/initDB";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = useCallback(() => {
    getDB()
      .then((db) => db.query("SELECT * FROM patients"))
      .then((result) => {
        console.log("Fetched patients:", result.rows);
        setPatients(result.rows || []);
      })
      .catch((err) => {
        console.error("Error fetching patients:", err);
        setPatients([]);
      });
  }, []);

  useEffect(() => {
    fetchPatients();
    window.addEventListener("patients-updated", fetchPatients);
    return () => window.removeEventListener("patients-updated", fetchPatients);
  }, [fetchPatients]);

  return (
    <div>
      <h2>All Registered Patients</h2>
      {patients.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.fullname}</td>
                <td>{p.dob}</td>
                <td>{p.gender}</td>
                <td>{p.phone}</td>
                <td>{p.email}</td>
                <td>{p.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;