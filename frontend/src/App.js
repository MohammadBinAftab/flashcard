// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard.jsx';
import Flashcard from './components/flashcard.jsx';
import Report from './components/report.jsx';
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ margin: '20px' }}>
        <Link to="/flashcards">
          <button style={{ marginRight: '10px' }}>View Flashcards</button>
        </Link>
        <Link to="/admin">
          <button>Admin Dashboard</button>
        </Link>
      </div>
      <Routes>
        <Route path="/flashcards" element={<Flashcard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/" element={<Flashcard />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
