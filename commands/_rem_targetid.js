/*CMD
  command: /rem_targetid
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

User.setProperty("add_target_id", message, "string")
Bot.sendMessage("💰 Enter the amount to add:")
Bot.runCommand("/rem_amount")
