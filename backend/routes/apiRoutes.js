const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const sendNotificationToAllUsers = require('../notification');
const bot = require('../bot');

router.post('/auth/login', authController.login);

router.post('/notify-all', async (req, res) => {
  const { message } = req.body;

  try {
    await sendNotificationToAllUsers(bot, message);
    res
      .status(200)
      .json({ success: true, message: 'Notification sent to all users.' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error sending notifications.' });
  }
});

module.exports = router;
