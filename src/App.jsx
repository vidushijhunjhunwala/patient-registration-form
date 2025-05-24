// src/App.jsx
import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import PatientRecords from './components/PatientList';
import SQLQueryPage from './components/SqlQueryPage';
import './components/PatientForm.css';
function App() {
  const [page, setPage] = useState('register');

  return (
    <div className="app">
      <h1 className="title"><center>Patient Registration System</center></h1>
      <div className="nav-buttons" ><center>
        <button onClick={() => setPage('register')} className="button-main">Register </button>
        <button onClick={() => setPage('records')} className="button-main" >Records </button>
        <button onClick={() => setPage('query')} className="button-main" >SQL Query </button></center>
      </div>

      {page === 'register' && <PatientForm />}
      {page === 'records' && <PatientRecords />}
      {page === 'query' && <SQLQueryPage />}
    </div>
  );
}

export default App;

