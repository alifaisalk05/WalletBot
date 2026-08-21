/*CMD
  command: /bet
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: bet
  group: 
CMD*/

/* =======================
COMMAND: /play
======================= */

let amount = parseFloat(params.trim())
if (!amount || amount <= 0) {
  return Bot.sendMessage("⚠️ Please enter a valid bet amount!\nUsage: /bet <amount>")
}

// Get user's current balance
let balance = Libs.ResourcesLib.userRes("balance")
let currentBal = balance.value()

// Check if user has enough coins
if (currentBal < amount) {
  return Bot.sendMessage(`❌ You don't have enough coins!\nYour balance: ${currentBal} 🪙\nRequired: ${amount} 🪙`)
}

// Check if game is already active in this group
let gameKey = `game_active_${chat.id}`
let activeGame = Bot.getProperty(gameKey)

if (activeGame) {
  return Bot.sendMessage("⚠️ A game is already active in this group! Wait for it to finish.")
}

// Create unique game ID
let gameId = `game_${chat.id}_${Date.now()}`

// Store game data
let gameData = {
  id: gameId,
  creator: user.id,
  creatorName: user.first_name || "User",
  betAmount: amount,
  status: "waiting",
  players: [],
  createdAt: new Date().toISOString()
}

Bot.setProperty(gameKey, gameData, "json")

// Create game message with buttons
let gameMessage = `🎮 *COIN FLIP GAME* 🎮

👤 Creator: ${gameData.creatorName}
💰 Bet Amount: ${amount} 🪙
⏳ Status: *Waiting for players...*

📌 *How to play:*
1️⃣ Reply to this message with /accept
2️⃣ Choose Heads or Tails
3️⃣ Winner gets 1.90× their bet!

🪙 *Current Prize Pool:* ${amount} 🪙

*Reply with /accept to join!*`

// Send game message with inline buttons
let sentMessage = Bot.sendMessage(gameMessage, {
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "✅ Accept Challenge", callback_data: `accept_${gameId}` }
      ]
    ]
  }
})

// Store game reference with message ID
gameData.messageId = sentMessage.message_id
Bot.setProperty(gameKey, gameData, "json")

// Set timeout for game expiry (2 minutes)
setTimeout(() => {
  let currentGame = Bot.getProperty(gameKey)
  if (currentGame && currentGame.status === "waiting") {
    Bot.sendMessage(`⏰ Game expired! No one accepted the challenge.`)
    Bot.setProperty(gameKey, null)
  }
}, 120000)  return Bot.sendMessage("⚠️ A game is already active in this group! Wait for it to finish.")
}
