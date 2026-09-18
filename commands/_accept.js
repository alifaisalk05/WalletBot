/*CMD
  command: /accept
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* =======================
COMMAND: /accept
======================= */

Bot.onText(/^\/accept$/, (msg) => {
  let chatId = msg.chat.id
  let userId = msg.from.id
  
  // Check if replying to a game message
  if (!msg.reply_to_message) {
    return Bot.sendMessage("⚠️ Please reply to a game message with /accept")
  }
  
  let gameKey = `game_active_${chatId}`
  let game = Bot.getProperty(gameKey)
  
  if (!game) {
    return Bot.sendMessage("❌ No active game found in this group!")
  }
  
  if (game.status !== "waiting") {
    return Bot.sendMessage("❌ This game is already in progress!")
  }
  
  // Check if player is already in game
  if (game.players.some(p => p.id === userId)) {
    return Bot.sendMessage("❌ You already joined this game!")
  }
  
  // Check if creator is trying to join their own game
  if (game.creator === userId) {
    return Bot.sendMessage("❌ You can't join your own game!")
  }
  
  // Check if player has enough balance
  let playerBal = Libs.ResourcesLib.userRes("balance", userId).value()
  if (playerBal < game.betAmount) {
    return Bot.sendMessage(`❌ You need ${game.betAmount} 🪙 to join this game!\nYour balance: ${playerBal} 🪙`)
  }
  
  // Add player to game
  game.players.push({
    id: userId,
    name: msg.from.first_name || "User",
    choice: null
  })
  
  // If we have 2 players, start the game
  if (game.players.length === 2) {
    game.status = "playing"
    Bot.setProperty(gameKey, game, "json")
    
    // Show choice buttons to both players
    game.players.forEach(player => {
      Bot.sendMessage(`🪙 ${player.name}, choose your side!`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🦅 Heads", callback_data: `choice_${game.id}_${player.id}_heads` },
              { text: "🦅 Tails", callback_data: `choice_${game.id}_${player.id}_tails` }
            ]
          ]
        }
      })
    })
    
    let playersMessage = `🎮 *COIN FLIP - CHOOSE YOUR SIDE!* 🎮

👤 ${game.players[0].name} vs 👤 ${game.players[1].name}
💰 Bet: ${game.betAmount} 🪙 each
🏆 Prize: ${(game.betAmount * 1.9).toFixed(2)} 🪙

*Each player, choose Heads or Tails!*`
    
    Bot.sendMessage(playersMessage, { parse_mode: "Markdown" })
    
  } else {
    // Still waiting for more players
    Bot.setProperty(gameKey, game, "json")
    Bot.sendMessage(`✅ ${msg.from.first_name} joined the game! Waiting for one more player...`)
    
    // Update game message
    let updatedMessage = `🎮 *COIN FLIP GAME* 🎮

👤 Creator: ${game.creatorName}
💰 Bet Amount: ${game.betAmount} 🪙
⏳ Status: *Waiting for players...*

👥 Current Players: ${game.players.length}/2

🪙 *Current Prize Pool:* ${game.betAmount} 🪙

*Reply with /accept to join!*`
    
    Bot.editMessageText(updatedMessage, {
      chat_id: chatId,
      message_id: game.messageId,
      parse_mode: "Markdown"
    })
  }
})
