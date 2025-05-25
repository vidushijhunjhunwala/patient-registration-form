🩺 Patient Registration Form


A responsive, frontend-only patient registration application built using React, Vite, and PGlite (SQLite in the browser). Users can register new patients, edit their details, and view all stored patient records. All data is stored locally using WebAssembly-powered SQLite, so no backend server is required.

Live App: [(https://patient-registration-form-five.vercel.app/)](https://patient-registration-form-five.vercel.app/)

GitHub Repo: https://github.com/vidushijhunjhunwala/patient-registration-form


🛠️ Tech Stack

-React (with Vite)

-PGlite (SQLite via WebAssembly in the browser)

-IndexedDB (for persistent storage)

-HTML & CSS (basic, responsive styling)


✨ Features

📝 Register new patients with detailed personal and emergency contact info

💾 Fully frontend — no backend or external DB required

🔎 Query records using raw SQL

📋 View a table of all registered patients

⚡ Fast and persistent storage via IndexedDB

🧾 Edit and update patient records

📦 Data stored using PGlite: SQLite compiled to WebAssembly


🛠️ Setup Instructions

1. Clone the repository
   
   git clone

   https://github.com/vidushijhunjhunwala/patient-registration-form.git

   cd patient-registration-form

3. Install dependencies

   npm install

4. Start the development server

   npm run dev

5. Open the app in your browser:

   Navigate to http://localhost:5173 (or the port shown in your terminal).


🚀 Usage Guide

✅ Register a Patient

-Fill in the patient’s personal, emergency, insurance, and physician information.

-Emergency contact section is required; others are optional.

-Click Register New Patient to save the data.

📄 View All Patients

-Click View All Patients to see a table of all registered entries.

-Each record includes an edit button to update info.

🛠️ Edit a Patient

-On the View All Patients page, click the pencil icon beside a patient’s record.

-Make changes and submit the form to update.

🧠 Query Records Using Raw SQL

-Internally, the app uses raw SQL queries via PGlite:
  await db.exec("SELECT * FROM patients");

-You can modify the logic to support custom queries if needed.



![pr0](https://github.com/user-attachments/assets/205c684c-5320-4775-a6ef-02bd547bc0a2)


![pr1](https://github.com/user-attachments/assets/a427f2d5-4090-4f2d-bd78-623082b3c420)


![pr2](https://github.com/user-attachments/assets/1f38aa6d-17ea-4a3c-b0b9-e9cdcb551ef6)
