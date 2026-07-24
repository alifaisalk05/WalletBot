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

// Force Join Message
Api.sendMessage({
  chat_id: user.telegramid,
  text: "<b>Welcome to our Wallet Bot\nYou should agree to our terms and conditions to use this bot, click the button below.</b>",
  parse_mode: "html",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Agree", callback_data: "/mainfeed" }]
    ]
  }
})

// ---------------- CHECK START PARAM ----------------
let params = message.split(" ")
if (params.length > 1) {
  let code = params[1].toUpperCase()  // Example: MOYE-12345678
  let data = Bot.getProperty("code_" + code)

  if (!data) {
    Bot.sendMessage("❌ Invalid or expired code.")
    return
  }

  // check if user already claimed
  if (data.claimed.includes(user.telegramid)) {
    Bot.sendMessage("⚠️ You already claimed this code.")
    return
  }

  // check if claim limit reached
  if (data.claimed.length >= data.limit) {
    Bot.sendMessage("❌ This code has reached its claim limit.")
    return
  }

  // store code for claim_step2
  User.setProperty("claim_code", code, "string")

  // Send wait message
  Bot.sendMessage("⏳ Please wait while your code is claiming...")

  // run membership check via API (same as claim_step1)
  let apiUrl = "https://pirate-check-membership-api.onrender.com/verify" +
               "?token=8159741259:AAFINHh9Lk3s0Mpx-I8hno56alD2k8au9XA" +
               "&ch=" + data.channels.join(",") +
               "&userid=" + user.telegramid

  HTTP.get({
    url: apiUrl,
    success: "claim_step2",
    error: "claim_api_error"
  })
}
