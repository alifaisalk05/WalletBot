/*CMD
  command: creates_step1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Gifts

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* =======================
   Command: creates_step1
   ======================= */

let amt = parseFloat(message)

if(isNaN(amt) || amt <= 0){
  Bot.sendMessage("❌ Please enter a valid number.")
  Bot.runCommand("creates_step1")
  return
}

User.setProperty("temp_amt", amt, "float")

Bot.sendMessage("👥 Enter total number of users to claim:")
Bot.runCommand("creates_step2")
