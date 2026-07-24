/*CMD
  command: /senduser_getamount
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

let receiver_id = User.getProperty("send_target_id")
let amt = parseFloat(message)
let senderBal = Libs.ResourcesLib.userRes("balance")

if (!receiver_id || isNaN(amt) || amt <= 0 || senderBal.value() < amt) {
  Bot.sendMessage("❌ Invalid input or insufficient balance.")
  return
}

// Prevent sending to self
if (receiver_id == user.telegramid) {
  Bot.sendMessage("🚫 You cannot send coins to yourself.")
  return
}

// Use correct order: (resource, user_id)
let receiverBal = Libs.ResourcesLib.anotherUserRes("balance", receiver_id)
receiverBal.add(amt)
senderBal.remove(amt)

Bot.sendMessage("✅ ₹" + amt + " sent to user ID: " + receiver_id)
Bot.sendMessageToChatWithId(receiver_id, "💸 You received ₹" + amt + " from user ID: " + user.telegramid)
