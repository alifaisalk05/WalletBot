/*CMD
  command: creates_step2
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
   Command: creates_step2 (FINAL)
   ======================= */

let limit = parseInt(message)
if (isNaN(limit) || limit <= 0) {
  Bot.sendMessage("❌ Please enter a valid number.")
  Bot.runCommand("creates_step2")
  return
}

let amt = User.getProperty("temp_amt")
if (!amt || isNaN(amt)) {
  Bot.sendMessage("❌ Invalid amount. Please restart the process.")
  return
}

let total = amt * limit
let bal = Libs.ResourcesLib.userRes("balance")

if (bal.value() < total) {
  Bot.sendMessage("❌ You don’t have enough balance. Required: ₹" + total.toFixed(2))
  return
}

// 💸 Deduct balance
bal.add(-total)

// 🔐 Generate random code
let code = "MOYE-" + Math.random().toString(36).substring(2, 10).toUpperCase()

// 📢 Get required channels safely
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

// 💾 Save code data
let data = {
  creator: user.telegramid,
  amount: amt,
  limit: limit,
  claimed: [],
  channels: channels
}

Bot.setProperty("code_" + code, data, "json")

// ✅ Success message (HTML mode — safe for underscores)
let chDisplay = (channels.length > 0) ? channels.join(", ") : "<i>Not Set</i>"

Bot.sendMessage(
  "✅ <b>Code created successfully!</b>\n\n" +
  "📌 <b>Share this code with others:</b>\n" +
  "<code>" + code + "</code>\n\n" +
  "💰 <b>Per User:</b> ₹" + amt + "\n" +
  "👥 <b>Total Users:</b> " + limit + "\n" +
  "📢 <b>Required Channels:</b> " + chDisplay,
  { parse_mode: "HTML" }
)
