// report.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './report.css'; // Create this CSS file for styling

const Report = () => {
  const [issue, setIssue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., sending the issue to a server
    console.log('Reported Issue:', issue);
    alert('Thank you for reporting the issue!');
    setIssue('');
    navigate('/flashcards'); // Navigate back to flashcards after submission
  };

  return (
    <div className="report-container">
      <h1>Report a Problem</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Describe the problem..."
          rows="6"
          cols="50"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Report;
