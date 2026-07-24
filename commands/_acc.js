/*CMD
  command: /acc
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: account 👤
  group: 
CMD*/

/* =======================
   Command: account_info (FINAL)
   ======================= */

let bal = Libs.ResourcesLib.userRes("balance").value()
let upi = User.getProperty("upi_id")
let joined = user.date
let first = user.first_name || "N/A"

// 🧩 Safe fetch for channels (handles JSON/string/array/null)
let channels = User.getProperty("required_channels")
if (!channels) {
  channels = []
} else if (typeof channels === "string") {
  try {
    channels = JSON.parse(channels)
  } catch (e) {
    channels = []
  }
}

// 📋 Display formatting
let upiDisplay = upi ? `<code>${upi}</code>` : "<i>Not Linked</i>"
let chDisplay = (Array.isArray(channels) && channels.length > 0)
  ? channels.join(", ")
  : "<i>Not Set</i>"

// 🧾 Send the info (HTML mode — safe for underscores)
Bot.sendMessage(
  "👤 <b>Your Account Info</b>\n\n" +
  "🆔 <b>User ID:</b> <code>" + user.telegramid + "</code>\n" +
  "👨‍💼 <b>Name:</b> " + first + "\n" +
  "💰 <b>Balance:</b> ₹" + bal.toFixed(2) + "\n" +
  "🏦 <b>UPI Linked:</b> " + upiDisplay + "\n" +
  "📢 <b>Required Channels:</b> " + chDisplay,
  { parse_mode: "HTML" }
)
