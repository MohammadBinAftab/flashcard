import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const goToAdminDashboard = () => {
    navigate('/admin');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navItem}>FLASHCARDS</div>
      <button onClick={goToAdminDashboard} style={styles.adminButton}>
        <span style={styles.icon} className="material-symbols-outlined">person</span> Admin Dashboard
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: '20px',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  navItem: {
    marginLeft: '20px',
    fontSize: '24px',  // Added font size for better visibility
  },
  adminButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '20px',
    display: 'flex',  // Flexbox for icon and text alignment
    alignItems: 'center',  // Center align icon and text
  },
  icon: {
    fontSize: '20px',  // Adjust icon size
    marginRight: '8px',  // Space between icon and text
  }
};

export default Navbar;
