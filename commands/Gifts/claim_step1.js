/*CMD
  command: claim_step1
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

let code = message.toUpperCase()
let data = Bot.getProperty("code_" + code)

if (!data) {
  Bot.sendMessage("❌ Invalid or expired code.")
  return
}

// Check if user already claimed
if (data.claimed.includes(user.telegramid)) {
  Bot.sendMessage("⚠️ You already claimed this code.")
  return
}

// Check if claim limit reached
if (data.claimed.length >= data.limit) {
  Bot.sendMessage("❌ This code has reached its claim limit.")
  return
}

// Store code for next step
User.setProperty("claim_code", code, "string")

// Show checking message
Bot.sendMessage(
  "⏳ *Please wait...*\n\n" +
  "🔍 Checking your claim code and channel membership.\n" +
  "This may take a few seconds.",
  {
    parse_mode: "Markdown"
  }
)

// Verify membership via API
let apiUrl = "https://pirate-check-membership-api.onrender.com/verify" +
             "?token=8159741259:AAFINHh9Lk3s0Mpx-I8hno56alD2k8au9XA" +
             "&ch=" + data.channels.join(",") +
             "&userid=" + user.telegramid

HTTP.get({
  url: apiUrl,
  success: "claim_gift3",
  error: "claim_api_error"
})
