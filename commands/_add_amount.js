/*CMD
  command: /add_amount
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

let uid = User.getProperty("add_target_id")
let amt = parseFloat(message)

if (!uid || isNaN(amt) || amt <= 0) {
  Bot.sendMessage("❌ Invalid input. Please restart the /add command.")
  return
}

let bal = Libs.ResourcesLib.anotherUserRes("balance", uid)
bal.add(amt)

Bot.sendMessage("✅ ₹" + amt + " added to user ID: " + uid)
Bot.sendMessageToChatWithId(uid, "💰 Admin has added ₹" + amt + " to your wallet!")
