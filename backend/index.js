require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const port = process.env.PORT || 3000;

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('You already subscribed');
});

bot.hears(/.*/, (ctx) => {
  console.log(`Chat ID: ${ctx.chat.id}`);
  ctx.reply(`Your chat_id: ${ctx.chat.id}`);
});

bot.launch();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/webhook', (req, res) => {
  const userIp = req.ip;
  const data = req.body;

  bot.telegram.sendMessage(
    process.env.ADMIN_CHAT_ID,
    `Request from ${userIp}: ${JSON.stringify(data)}`
  );

  res.send('Webhook received');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
