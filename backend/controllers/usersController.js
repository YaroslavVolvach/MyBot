const User = require('../models/userModel');

exports.get_all_users = async (req, res) => {
  try {
    const users = await User.find({}, 'username telegramId');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
