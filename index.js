const mineflayer = require('mineflayer')
const http = require('http')

// HTTP Server to keep Render awake
const port = process.env.PORT || 8080
http.createServer((req, res) => {
  res.write("AFK Bot is alive!")
  res.end()
}).listen(port)

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Shardamc.aternos.me',
    port: 43181,
    username: 'Yash_AFK_Bot'
  })

  bot.on('spawn', () => console.log('✅ Bot Joined Server!'))
  bot.on('end', () => {
    console.log('Disconnect ho gaya, 5 sec mein reconnect kar raha hu...')
    setTimeout(createBot, 5000)
  })
  bot.on('error', err => console.log('Error:', err))
}

createBot()
