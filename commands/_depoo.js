/*CMD
  command: /depoo
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: ➕ deposit
  group: 
CMD*/

Bot.sendMessage("💰 Please send the amount you want to deposit in ₹ (e.g., 50):");
Bot.runCommand("prodep");
