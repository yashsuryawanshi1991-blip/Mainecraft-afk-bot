const mineflayer = require('mineflayer');

// ⚙️ Aapke Server Ki Details Set Hain:
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
    
    // Anti-AFK: Har 30 second me jump karega taaki Aternos kick na kare
    setInterval(() => {
      if (bot && bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 30000);
  });

  // Chat message read karne ke liye
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`[CHAT] ${username}: ${message}`);
  });

  // Agar server se kick ho jaye:
  bot.on('kicked', (reason) => {
    console.log('❌ Bot kick hua. Wajeh:', reason);
  });

  // Auto-Reconnect Logic: Disconnect hote hi 10 sec me wapas join karega
  bot.on('end', () => {
    console.log('⚠️ Bot disconnect ho gaya. 10 seconds me reconnect kar raha hu...');
    setTimeout(startBot, 10000);
  });

  // Errors capture karne ke liye:
  bot.on('error', (err) => {
    console.log('⚠️ Error coming:', err.message);
  });
}

// Bot start karo
startBot();
