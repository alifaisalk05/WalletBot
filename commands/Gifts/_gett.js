/*CMD
  command: /gett
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Gifts

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: claim gift 🎁
  group: 
CMD*/

/* =======================
   Command: /claim
   ======================= */

Bot.sendMessage("🔑 Please enter the claim code:")
Bot.runCommand("claim_step1")
