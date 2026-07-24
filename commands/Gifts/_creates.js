/*CMD
  command: /creates
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Gifts

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: create gift 🎁
  group: 
CMD*/

/* =======================
   Command: /creates
   ======================= */

let channels = User.getProperty("required_channels")

if(!channels || channels.length === 0){
  Bot.sendMessage("❌ You need to set your required channels.")
  return
}

Bot.sendMessage("💰 Enter per-user amount:")
Bot.runCommand("creates_step1")
