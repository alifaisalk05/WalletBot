/*CMD
  command: /loginme
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

let owner_id = "6966950770"
if (user.telegramid != owner_id) {
  Bot.sendMessage("❌ Only the bot owner can run this command.")
  return
}

Bot.setProperty("SuperAdminID", user.telegramid, "string")
Bot.sendMessage("✅ You are now the Super Admin.")
