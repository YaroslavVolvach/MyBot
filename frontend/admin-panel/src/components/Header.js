import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="header">
      <h1>Admin Panel</h1>
      {isAuthenticated ? (
        <>
          <nav className="navbar">
            <Link to="/notifications">Notifications</Link>
            <Link to="/users">User List</Link>
            <Link to="/create-user">Create User</Link>
          </nav>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </>
      ) : null}
    </header>
  );
};

export default Header;
