const User = require('./models/userModel');

async function sendNotificationToAllUsers(bot, message) {
  try {
    const users = await User.find({});

    for (let user of users) {
      try {
        if (
          user.role !== 'admin' &&
          user.telegramId &&
          !isNaN(user.telegramId) &&
          !user.isBanned
        ) {
          await bot.telegram.sendMessage(user.telegramId, message);
        } else {
          console.error(
            `User with ID ${user._id} has an invalid telegramId: ${user.telegramId}`
          );
        }
      } catch (error) {
        if (error.response && error.response.error_code === 400) {
          console.error(
            `Failed to send message to ${user.telegramId}: ${error.response.description}`
          );
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('Error sending message to users:', error);
    throw error;
  }
}

module.exports = sendNotificationToAllUsers;
