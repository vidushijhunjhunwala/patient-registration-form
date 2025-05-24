// src/components/SQLQueryPage.jsx
import React, { useState } from "react";
import { getDB } from "../db/initDB";

const exampleQueries = [
  "SELECT * FROM patients ORDER BY created_at DESC LIMIT 5;",
  "SELECT gender, COUNT(*) FROM patients GROUP BY gender;",
  "SELECT * FROM patients WHERE dob > '2000-01-01';",
];

const SQLQueryPage = () => {
  const [query, setQuery] = useState("SELECT * FROM patients LIMIT 10;");
  const [results, setResults] = useState([]);
  const [fields, setFields] = useState([]);
  const [error, setError] = useState("");

  const executeQuery = async () => {
    try {
      const db = await getDB();
      const res = await db.exec(query);
      setFields(res[0]?.fields || []);
      setResults(res[0]?.rows || []);
      setError("");
    } catch (err) {
      setError(err.message);
      setResults([]);
      setFields([]);
    }
  };

  return (
    <div className="query-container" style={{ padding: "20px" }}>
      <h2>SQL Query</h2>
      <p>Execute raw SQL queries against the patient database</p>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={5}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <br />
      <button onClick={executeQuery} style={{ marginBottom: "20px" }}>
        Execute Query
      </button>

      {error && <p className="error" style={{ color: "red" }}>{error}</p>}

      <h3>Results</h3>
      {results.length === 0 ? (
        <p>No results to display</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                {fields.map((f) => (
                  <th
                    key={f.name}
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      backgroundColor: "#1e1e90",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "14px",
                    }}
                  >
                    {f.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i}>
                  {fields.map((f) => (
                    <td
                      key={f.name}
                      style={{
                        border: "1px solid black",
                        padding: "10px",
                        wordBreak: "break-word",
                        fontSize: "13px",
                      }}
                    >
                      {row[f.name]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h4 style={{ marginTop: "20px" }}>Example Queries:</h4>
      <ul>
        {exampleQueries.map((q, i) => (
          <li key={i}>
            <code>{q}</code>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SQLQueryPage;