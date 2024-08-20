// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/LoginPage.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}http://localhost:3001/api/auth/login`,
        {
          username,
          password,
        }
      );

      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      alert('Error logging in: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
