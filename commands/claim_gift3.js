/*CMD
  command: claim_gift3
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
   Command: claim_step2
   ======================= */

let code = User.getProperty("claim_code")
let data = Bot.getProperty("code_" + code)

if (!data) {
  Bot.sendMessage("❌ Invalid or expired claim code.")
  return
}

let result = JSON.parse(content)

// Check membership
if (!result.all_member) {

  let notJoined = result.not_member_channels || []
  let privateLinks = data.private_links || {}

  let text = "❌ *You haven't joined all required channels!*\n\n"

  if (notJoined.length > 0) {

    text += "📢 Please join these channels first:\n\n"

    for (let i = 0; i < notJoined.length; i++) {

      let ch = String(notJoined[i]).trim()

      if (privateLinks[ch]) {
        text += "• " + privateLinks[ch] + "\n"
      } else {
        text += "• " + ch + "\n"
      }

    }

  }

  text += "\nAfter joining all channels, click the button below to claim again."

  Bot.sendInlineKeyboard(
    [
      [
        {
          title: "✅ Joined",
          url: "https://t.me/moyewallet_bot?start=" + code
        }
      ]
    ],
    text,
    {
      parse_mode: "Markdown"
    }
  )

  return
}

// Already claimed
if (data.claimed.indexOf(user.telegramid) !== -1) {
  Bot.sendMessage("❌ You have already claimed this code.")
  return
}

// Give reward
let bal = Libs.ResourcesLib.userRes("balance")
bal.add(data.amount)

// Mark claimed
data.claimed.push(user.telegramid)
Bot.setProperty("code_" + code, data, "json")

// Notify claimer
Bot.sendMessage(
  "✅ *Successfully claimed ₹" +
    data.amount.toFixed(2) +
    "*\n\n" +
    "🔑 Code: `" +
    code +
    "`",
  {
    parse_mode: "Markdown"
  }
)

// Notify creator
Bot.sendMessageToChatWithId(
  data.creator,
  "📢 *Code Claimed!*\n\n" +
    "👤 User: [" +
    (user.first_name || "Unknown") +
    "](tg://user?id=" +
    user.telegramid +
    ")\n" +
    "🆔 ID: `" +
    user.telegramid +
    "`\n" +
    "💰 Amount: ₹" +
    data.amount.toFixed(2) +
    "\n" +
    "🔑 Code: `" +
    code +
    "`",
  {
    parse_mode: "Markdown"
  }
)
