/*CMD
  command: choice_
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
CALLBACK: choice_
======================= */

Bot.on("callback_query", (callback) => {
  let data = callback.data
  if (!data.startsWith("choice_")) return
  
  let parts = data.split("_")
  let gameId = parts[1]
  let playerId = parseInt(parts[2])
  let choice = parts[3]
  
  let gameKey = `game_active_${callback.message.chat.id}`
  let game = Bot.getProperty(gameKey)
  
  if (!game || game.id !== gameId) {
    return Bot.answerCallbackQuery(callback.id, "❌ Game no longer exists!", true)
  }
  
  if (game.status !== "playing") {
    return Bot.answerCallbackQuery(callback.id, "❌ Game not in playing state!", true)
  }
  
  // Verify player is in game
  let player = game.players.find(p => p.id === playerId)
  if (!player) {
    return Bot.answerCallbackQuery(callback.id, "❌ You're not in this game!", true)
  }
  
  // Check if player already chose
  if (player.choice) {
    return Bot.answerCallbackQuery(callback.id, "❌ You already made your choice!", true)
  }
  
  // Record choice
  player.choice = choice
  Bot.setProperty(gameKey, game, "json")
  
  Bot.answerCallbackQuery(callback.id, `✅ You chose ${choice.toUpperCase()}!`, true)
  
  // Check if both players have chosen
  if (game.players.every(p => p.choice)) {
    // Flip the coin
    let result = Math.random() < 0.5 ? "heads" : "tails"
    let winner = game.players.find(p => p.choice === result)
    let loser = game.players.find(p => p.choice !== result)
    
    // Calculate winnings (1.90x)
    let winAmount = game.betAmount * 1.9
    
    // Update balances
    let winnerBal = Libs.ResourcesLib.userRes("balance", winner.id)
    let loserBal = Libs.ResourcesLib.userRes("balance", loser.id)
    
    // Deduct from loser
    loserBal.add(-game.betAmount)
    
    // Add winnings to winner
    winnerBal.add(winAmount)
    
    // Update game status
    game.status = "finished"
    Bot.setProperty(gameKey, game, "json")
    
    // Clear game after completion
    setTimeout(() => {
      Bot.setProperty(gameKey, null)
    }, 30000)
    
    // Send result
    let resultMessage = `🎯 *COIN FLIP RESULT* 🎯

🪙 The coin landed on: *${result.toUpperCase()}*!

🏆 *WINNER:* ${winner.name}
💰 Won: ${winAmount.toFixed(2)} 🪙 (1.90× bet)

💀 *LOSER:* ${loser.name}
💸 Lost: ${game.betAmount} 🪙

📊 *New Balances:*
${winner.name}: ${winnerBal.value().toFixed(2)} 🪙
${loser.name}: ${loserBal.value().toFixed(2)} 🪙`

    Bot.sendMessage(resultMessage, { parse_mode: "Markdown" })
  }
})
