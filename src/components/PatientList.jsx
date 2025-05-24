import React, { useEffect, useState } from 'react';
import { getDB } from '../db/initDB';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const db = await getDB();
      const result = await db.exec("SELECT * FROM patients");
      setPatients(result[0]?.values || []);
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <h2>All Registered Patients</h2>
      {patients.length === 0 ? <p>No records found.</p> :
        <table>
          <thead>
            <tr>
              <th>Name</th><th>DOB</th><th>Gender</th><th>Phone</th><th>Email</th><th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, idx) => (
              <tr key={idx}>
                <td>{p[1]}</td>
                <td>{p[2]}</td>
                <td>{p[3]}</td>
                <td>{p[6]}</td>
                <td>{p[7]}</td>
                <td>{p[8]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default PatientList;
