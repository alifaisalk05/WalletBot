/*CMD
  command: /senduser_getid
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

User.setProperty("send_target_id", message, "string")
Bot.sendMessage("💸 Enter the amount to send:")
Bot.runCommand("/senduser_getamount")
