/*CMD
  command: /che
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

/* ==========================
   Command: /checkbal
   Usage: /checkbal USER_ID
   ========================== */

let allowedAdmins = ["6966950770", "7794748938"]  // replace with your admin IDs

if (!allowedAdmins.includes(user.telegramid.toString())) {
  Bot.sendMessage("❌ You are not authorized to use this command.")
  return
}

// make sure a user ID is passed
if (!params) {
  Bot.sendMessage("⚠️ Usage: /checkbal USER_ID")
  return
}

let target_id = params.trim()
let bal = Libs.ResourcesLib.anotherUserRes("balance", target_id).value()
let upi = User.getProperty("upi_id", null, target_id)
let first = User.getProperty("first_name", "N/A", target_id)

let upiDisplay = upi ? "`" + upi + "`" : "_Not Linked_"

Bot.sendMessage(
  "👤 *User Account Info*\n\n" +
  "🆔 *User ID:* `" + target_id + "`\n" +
  "👨‍💼 *Name:* " + first + "\n" +
  "💰 *Balance:* ₹" + bal.toFixed(2) + "\n" +
  "🏦 *UPI Linked:* " + upiDisplay,
  { parse_mode: "Markdown" }
)
