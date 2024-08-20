// bot.js

const { Telegraf } = require('telegraf');
const User = require('./models/userModel');
const sendNotificationToAllUsers = require('./notification');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const chatId = ctx.chat.id;
  const username = ctx.from.username || 'User';

  try {
    let user = await User.findOne({ telegramId: chatId });

    if (!user) {
      user = new User({
        telegramId: chatId,
        username: username,
        password: '',
      });
      await user.save();
      ctx.reply(`Welcome, ${username}! You are now registered.`);

      await sendNotificationToAllUsers(
        bot,
        `${username} has just joined the bot!`,
        chatId
      );
    } else {
      ctx.reply(`Welcome back, ${username}!`);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    ctx.reply('An error occurred while registering. Please try again later.');
  }
});

bot.launch();

console.log('Bot is up and running...');

module.exports = bot;
