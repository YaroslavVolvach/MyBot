import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './css/LoginPage.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      alert('Error logging in: ' + error.response.data);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
        padding: 2,
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <h2>Login</h2>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
