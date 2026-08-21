/*CMD
  command: accept_
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
CALLBACK: accept_
======================= */

Bot.on("callback_query", (callback) => {
  let data = callback.data
  if (!data.startsWith("accept_")) return
  
  let gameId = data.replace("accept_", "")
  let gameKey = `game_active_${callback.message.chat.id}`
  let game = Bot.getProperty(gameKey)
  
  if (!game || game.id !== gameId) {
    return Bot.answerCallbackQuery(callback.id, "❌ Game no longer exists!", true)
  }
  
  if (game.status !== "waiting") {
    return Bot.answerCallbackQuery(callback.id, "❌ Game already in progress!", true)
  }
  
  let playerId = callback.from.id
  
  // Check if player is already in game
  if (game.players.some(p => p.id === playerId)) {
    return Bot.answerCallbackQuery(callback.id, "❌ You already joined this game!", true)
  }
  
  // Check if player has enough balance
  let playerBal = Libs.ResourcesLib.userRes("balance", playerId).value()
  if (playerBal < game.betAmount) {
    return Bot.answerCallbackQuery(callback.id, `❌ You need ${game.betAmount} 🪙 to join!`, true)
  }
  
  // Add player to game
  game.players.push({
    id: playerId,
    name: callback.from.first_name || "User",
    choice: null
  })
  
  // If we have 2 players, start the game
  if (game.players.length === 2) {
    game.status = "playing"
    Bot.setProperty(gameKey, game, "json")
    
    // Show choice buttons to both players
    let playersMessage = `🎮 *COIN FLIP - CHOOSE YOUR SIDE!* 🎮

👤 ${game.players[0].name} vs 👤 ${game.players[1].name}
💰 Bet: ${game.betAmount} 🪙 each
🏆 Prize: ${(game.betAmount * 1.9).toFixed(2)} 🪙

*Each player, choose Heads or Tails!*`
    
    Bot.sendMessage(playersMessage, { parse_mode: "Markdown" })
    
    // Send choice buttons to both players
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
    
  } else {
    // Still waiting for more players
    Bot.setProperty(gameKey, game, "json")
    Bot.answerCallbackQuery(callback.id, "✅ Joined the game! Waiting for another player...", true)
    
    // Update game message
    let updatedMessage = `🎮 *COIN FLIP GAME* 🎮

👤 Creator: ${game.creatorName}
💰 Bet Amount: ${game.betAmount} 🪙
⏳ Status: *Waiting for players...*

👥 Current Players: ${game.players.length}/2

🪙 *Current Prize Pool:* ${game.betAmount} 🪙

*Reply with /accept to join!*`
    
    Bot.editMessageText(updatedMessage, {
      chat_id: callback.message.chat.id,
      message_id: game.messageId,
      parse_mode: "Markdown"
    })
  }
})
