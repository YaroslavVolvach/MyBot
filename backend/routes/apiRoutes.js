const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/userModel');
const sendNotificationToAllUsers = require('../notification');
const bot = require('../bot');

router.post('/auth/login', authController.login);

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/users/ban', async (req, res) => {
  const { telegramId } = req.body;

  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBanned = true;
    await user.save();

    res.json({ message: `User ${user.username} has been banned.` });
  } catch (error) {
    console.error('Error banning user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/users/unban', async (req, res) => {
  const { telegramId } = req.body;

  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isBanned = false;
    await user.save();
    res.json({ message: 'User unbanned successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error unbanning user' });
  }
});

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
