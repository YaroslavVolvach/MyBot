require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const port = process.env.PORT || 3000;

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

let subscribers = [];

bot.start((ctx) => {
  const chatId = ctx.chat.id;
  if (!subscribers.includes(chatId)) {
    subscribers.push(chatId);
    ctx.reply('You are now subscribed to notifications!');
  } else {
    ctx.reply('You are already subscribed.');
  }
});

app.use(express.json());

app.post('/webhook', (req, res) => {
  const userIp = req.ip; // Get the user's IP address
  const data = req.body; // Get the data from the request body

  const message = `New request from ${userIp} with data: ${JSON.stringify(
    data
  )}`;

  subscribers.forEach((chatId) => {
    bot.telegram
      .sendMessage(chatId, message)
      .catch((err) =>
        console.error(`Error sending message to user ${chatId}:`, err)
      );
  });

  res.send('Message sent to subscribers');
});

bot.launch();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
