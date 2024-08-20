import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './css/AddUserForm.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddUserForm = () => {
  const [telegramId, setTelegramId] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(`${BASE_URL}/api/users`, {
        telegramId,
        username,
      });
      setSuccess('User added successfully!');
      setTelegramId('');
      setUsername('');
    } catch (error) {
      setError('Failed to add user. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <h2>Add User</h2>
      <TextField
        label="Telegram ID"
        variant="outlined"
        value={telegramId}
        onChange={(e) => setTelegramId(e.target.value)}
        required
      />
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <Button variant="contained" color="primary" type="submit">
        Add User
      </Button>
    </Box>
  );
};

export default AddUserForm;
