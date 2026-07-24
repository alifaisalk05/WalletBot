/*CMD
  command: /adx
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

/* /gift command */
let admin_ids = [6966950770, 987654321]   // replace with your admin IDs

if (!admin_ids.includes(user.telegramid)) {
  Bot.sendMessage("❌ You are not authorized to use this command.")
  return
}

Bot.sendMessage("👥 Enter the total number of codes you want to generate:")
Bot.runCommand("gift_limitx")
