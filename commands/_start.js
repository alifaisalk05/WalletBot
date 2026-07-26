/*CMD
  command: /start
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

/* =======================
   START COMMAND
   ======================= */

// Track new users
let users = Bot.getProperty("wholeUsers", [])
if (!users.includes(user.telegramid)) {
  users.push(user.telegramid)
  Bot.setProperty("wholeUsers", users, "json")
}

// ================= TERMS CHECK =================
let agreed = User.getProperty("agreed_terms")

if (!agreed) {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "<b>Welcome to our Wallet Bot\n\nYou should agree to our Terms & Conditions before using this bot.</b>",
    parse_mode: "html",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🟢 Agree",
            callback_data: "/mainfeed"
          }
        ]
      ]
    }
  })
  return
}

// ---------------- CHECK START PARAM ----------------
let params = message.split(" ")

if (params.length > 1) {

  let code = params[1].toUpperCase() // Example: MOYE-12345678
  let data = Bot.getProperty("code_" + code)

  if (!data) {
    Bot.sendMessage("❌ Invalid or expired code.")
    return
  }

  // Already claimed
  if (data.claimed.includes(user.telegramid)) {
    Bot.sendMessage("⚠️ You already claimed this code.")
    return
  }

  // Claim limit reached
  if (data.claimed.length >= data.limit) {
    Bot.sendMessage("❌ This code has reached its claim limit.")
    return
  }

  // Save code for claim process
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

  // Membership API
  let apiUrl =
    "https://pirate-check-membership-api.onrender.com/verify" +
    "?token=8159741259:AAFINHh9Lk3s0Mpx-I8hno56alD2k8au9XA" +
    "&ch=" + data.channels.join(",") +
    "&userid=" + user.telegramid

  // Continue to membership check
  HTTP.get({
    url: apiUrl,
    success: "claim_gift3",
    error: "claim_api_error"
  })

  return
}

// ================= NORMAL START =================
Bot.runCommand("/mainfeed")
