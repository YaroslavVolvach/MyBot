import React, { useState } from 'react';
import axios from 'axios';
import './css/NotifyForm.css';

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
    <div className="notify-form-container">
      <form className="notify-form" onSubmit={handleSubmit}>
        <h3>Send Notification</h3>
        <div>
          <label>Notification Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Notification</button>
      </form>
    </div>
  );
};

export default NotifyForm;
