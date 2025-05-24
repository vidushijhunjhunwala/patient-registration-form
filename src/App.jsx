// src/App.jsx
import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import PatientRecords from './components/PatientList';
import SQLQueryPage from './components/SqlQueryPage';

function App() {
  const [page, setPage] = useState('register');

  return (
    <div className="app">
      <h1 className="title">Patient Registration App</h1>
      <div className="nav-buttons">
        <button onClick={() => setPage('register')}>Register New Patient</button>
        <button onClick={() => setPage('records')}>View All Patients</button>
        <button onClick={() => setPage('query')}>SQL Query</button>
      </div>

      {page === 'register' && <PatientForm />}
      {page === 'records' && <PatientRecords />}
      {page === 'query' && <SQLQueryPage />}
    </div>
  );
}

export default App;

