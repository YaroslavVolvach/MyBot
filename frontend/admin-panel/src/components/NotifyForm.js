import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const NotifyForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/notify-all`, { message });
      alert('Notification sent successfully!');
      setMessage('');
    } catch (error) {
      alert('Failed to send notification. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Send Notification to All Users
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Notification Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" type="submit">
              Send Notification
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default NotifyForm;
