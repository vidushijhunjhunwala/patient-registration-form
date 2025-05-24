import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

const App = () => {
  const [showList, setShowList] = useState(false);

  return (
    <div className="container">
      <h1>Patient Registration App</h1>
      <div className="buttons">
        <button onClick={() => setShowList(false)}>Register New Patient</button>
        <button onClick={() => setShowList(true)}>View All Patients</button>
      </div>
      {showList ? <PatientList /> : <PatientForm />}
    </div>
  );
};

export default App;
