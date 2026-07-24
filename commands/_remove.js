/*CMD
  command: /remove
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
if (user.telegramid != admin) {
  Bot.sendMessage("❌ You are not authorized to use this command.")
  return
}

Bot.sendMessage("👤 Enter the Telegram ID of the user you want to remove coins:")
Bot.runCommand("/rem_targetid")
