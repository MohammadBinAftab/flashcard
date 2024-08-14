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
        Admin Dashboard
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',  // Space between items
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
    marginLeft: '20px',  // Add some space on the left for better alignment
  },
  adminButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '20px',  // Add some space on the right
  }
};

export default Navbar;
