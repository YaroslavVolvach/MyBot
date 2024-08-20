const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    if (user.role !== 'admin') {
      return res
        .status(401)
        .json({ message: 'Admin panel is only for admin!' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
