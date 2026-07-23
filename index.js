const mineflayer = require('mineflayer');
const http = require('http');

// 🌐 Render ke Port Warning ko fix karne ke liye Web Server:
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.write("AFK Bot is Online 24/7!");
  res.end();
}).listen(PORT, () => {
  console.log(`Web Server running on port ${PORT}`);
});

// ⚙️ Aapke Server Ki Details:
const SERVER_HOST = 'Shardamc.aternos.me';
const SERVER_PORT = 43181;
const BOT_USERNAME = 'AFK_Bot_Yash';

function startBot() {
  console.log('Connecting bot to Shardamc server...');

  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: BOT_USERNAME,
    checkTimeoutInterval: 60 * 1000
  });

  // Server par join karte hi:
  bot.on('spawn', () => {
    console.log('✅ Bot Shardamc server par online aagaya hai!');
    
    // Anti-AFK: Har 30 second me jump karega
    setInterval(() => {
      if (bot && bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 30000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`[CHAT] ${username}: ${message}`);
  });

  bot.on('kicked', (reason) => {
    console.log('❌ Bot kick hua. Wajeh:', reason);
  });

  bot.on('end', () => {
    console.log('⚠️ Bot disconnect ho gaya. 10 seconds me reconnect kar raha hu...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Error coming:', err.message);
  });
}

startBot();

