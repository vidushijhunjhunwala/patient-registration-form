import React, { useState } from 'react';

function SQLQuery({ db }) {
  const [query, setQuery] = useState('SELECT * FROM patients LIMIT 10;');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const executeQuery = async () => {
    try {
      const res = await db.exec(query); // PGlite-style query
      setResult(res[0]?.values || []);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult([]);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>SQL Query</h2>
      <p>Execute raw SQL queries against the patient database</p>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
        cols={80}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <button onClick={executeQuery} style={{ backgroundColor: 'blue', color: 'white', padding: '0.5rem 1rem' }}>
        Execute Query
      </button>

      <h3>Results</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && result.length === 0 && <p>No results to display</p>}
      {!error && result.length > 0 && (
        <table border="1" cellPadding="5">
          <tbody>
            {result.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4>Example Queries:</h4>
      <ul>
        <li>SELECT * FROM patients ORDER BY id DESC LIMIT 5;</li>
        <li>SELECT gender, COUNT(*) FROM patients GROUP BY gender;</li>
        <li>SELECT * FROM patients WHERE date_of_birth &lt; '2000-01-01';</li>
      </ul>
    </div>
  );
}

export default SQLQuery;
