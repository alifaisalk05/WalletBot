/*CMD
  command: /claim
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

Bot.sendMessage("🔑 Enter the 6-digit claim code:")
Bot.runCommand("/claim_code")
