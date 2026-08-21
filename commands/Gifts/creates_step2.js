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

let amt = parseFloat(User.getProperty("temp_amt"))

if (isNaN(amt) || amt <= 0) {
  Bot.sendMessage("❌ Invalid amount. Please restart the process.")
  return
}

let total = amt * limit

let bal = Libs.ResourcesLib.userRes("balance")

if (bal.value() < total) {
  Bot.sendMessage(
    "❌ You don't have enough balance.\n\nRequired: ₹" +
    total.toFixed(2)
  )
  return
}

// Deduct balance
bal.add(-total)

// Generate code
let code = "MOYE-" + Math.random().toString(36).substr(2, 8).toUpperCase()

// Get saved channels
let channels = User.getProperty("required_channels")
if (!channels) channels = []

// Get private links
let privateLinks = User.getProperty("private_links")
if (!privateLinks) privateLinks = {}

// Save gift
let data = {
  creator: user.telegramid,
  amount: amt,
  limit: limit,
  claimed: [],
  channels: channels,
  private_links: privateLinks
}

Bot.setProperty("code_" + code, data, "json")

// Display channels
let chDisplay = "<i>Not Set</i>"

if (channels.length > 0) {
  chDisplay = channels.join(", ")
}

// Direct claim link
let botUsername = "MoyeWallet_Bot" // Change if your bot username is different
let claimLink = "https://t.me/" + botUsername + "?start=" + code

// Success
Bot.sendMessage(
  "✅ <b>Gift Code Created Successfully!</b>\n\n" +
  "🔑 <b>Code:</b>\n" +
  "<code>" + code + "</code>\n\n" +
  "🔗 <b>Direct Claim Link:</b>\n" +
  "<code>" + claimLink + "</code>\n\n" +
  "💰 <b>Per User:</b> ₹" + amt.toFixed(2) + "\n" +
  "👥 <b>Claim Limit:</b> " + limit + "\n" +
  "💸 <b>Total Deducted:</b> ₹" + total.toFixed(2) + "\n\n" +
  "📢 <b>Required Channels:</b>\n" +
  chDisplay,
  {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🎁 Claim Gift",
            url: claimLink
          }
        ]
      ]
    }
  }
)
