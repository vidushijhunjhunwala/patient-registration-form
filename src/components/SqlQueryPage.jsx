//src/components/SQLQueryPage.jsx
import React, { useState } from 'react';
import { getDB } from '../db/initDB';

const exampleQueries = [
  "SELECT * FROM patients ORDER BY created_at DESC LIMIT 5;",
  "SELECT gender, COUNT(*) FROM patients GROUP BY gender;",
  "SELECT * FROM patients WHERE dob > '2000-01-01';"
];

const SQLQueryPage = () => {
  const [query, setQuery] = useState("SELECT * FROM patients LIMIT 10;");
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const executeQuery = async () => {
    try {
      const db = await getDB();
      const res = await db.exec(query);
      setResults(res);
      setError('');
    } catch (err) {
      setError(err.message);
      setResults([]);
    }
  };

  return (
    <div className="query-container">
      <h2>SQL Query</h2>
      <p>Execute raw SQL queries against the patient database</p>
      <textarea value={query} onChange={e => setQuery(e.target.value)} rows={5} />
      <br />
      <button onClick={executeQuery}>Execute Query</button>
      {error && <p className="error">{error}</p>}
      <h3>Results</h3>
      {results.length === 0 ? (
        <p>No results to display</p>
      ) : (
        results.map((table, idx) => (
          <table key={idx} border="1">
            <thead>
              <tr>
                {table.columns.map(col => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {table.values.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ))
      )}

      <h4>Example Queries:</h4>
      <ul>
        {exampleQueries.map((q, i) => (
          <li key={i}><code>{q}</code></li>
        ))}
      </ul>
    </div>
  );
};

export default SQLQueryPage;
