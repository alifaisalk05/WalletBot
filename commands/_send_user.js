/*CMD
  command: /send_user
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: send money 🤑
  group: 
CMD*/

Bot.sendMessage("👤 Enter the Telegram ID of the user you want to send coins to:")
Bot.runCommand("/senduser_getid")
