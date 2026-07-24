/*CMD
  command: gift_limitx
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* gift_limit command */
let limit = parseInt(message)

if (isNaN(limit) || limit <= 0) {
  Bot.sendMessage("❌ Enter a valid number.")
  Bot.runCommand("gift_limitx")
  return
}

User.setProperty("temp_limit", limit, "integer")
Bot.sendMessage("💰 Enter the amount per code:")
Bot.runCommand("gift_amountx")
