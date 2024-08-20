import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header>
      <h1>Admin Panel</h1>
      {isAuthenticated && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
