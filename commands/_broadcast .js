/*CMD
  command: /broadcast 
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

let admin = Bot.getProperty("SuperAdminID")
if (user.telegramid != admin) return Bot.sendMessage("❌ Not allowed")

Bot.sendMessage("📝 Send the message to broadcast:")
Bot.runCommand("/broadcast_go")
