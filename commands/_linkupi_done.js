/*CMD
  command: /linkupi_done
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

User.setProperty("upi_id", message, "string")
Bot.sendMessage("✅ Your UPI ID has been linked: `" + message + "`", {parse_mode:"Markdown"})
