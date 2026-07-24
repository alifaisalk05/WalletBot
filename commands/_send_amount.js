/*CMD
  command: /send_amount
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

let amt = parseFloat(message)
let bal = Libs.ResourcesLib.userRes("balance")

if (isNaN(amt) || amt <= 0 || amt > bal.value()) {
  Bot.sendMessage("❌ Invalid amount.")
  return
}

User.setProperty("temp_amt", amt, "float")
Bot.sendMessage("👥 How many users can claim this amount?")
Bot.runCommand("/send_claim_limit")
