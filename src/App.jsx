import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

const App = () => {
  const [showList, setShowList] = useState(false);

  return (
  <div className="container">
      <h1><center>Patient Registration System</center></h1>
      <div className="buttons"><center>
        <button onClick={() => setShowList(false)}>Register</button>
        <button onClick={() => setShowList(true)}>Records</button></center>
      </div>
      {showList ? <PatientList /> : <PatientForm />}
    </div>

  );
};

export default App;
