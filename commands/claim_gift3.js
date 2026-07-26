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

let code = User.getProperty("claim_code") // get stored code
let data = Bot.getProperty("code_" + code)

if (!data) {
  Bot.sendMessage("❌ Invalid or expired claim code.")
  return
}

let result = JSON.parse(content)

// check membership
if (!result.all_member) {

  let notJoined = result.not_member_channels || []

  let text = "❌ *You haven't joined all required channels!*\n\n"

  if (notJoined.length > 0) {
    text += "📢 Please join these channels first:\n\n"
    for (let i = 0; i < notJoined.length; i++) {
      text += "• " + notJoined[i] + "\n"
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
    { parse_mode: "Markdown" }
  )

  return
}

// Already claimed check
if (data.claimed.indexOf(user.telegramid) !== -1) {
  Bot.sendMessage("❌ You have already claimed this code.")
  return
}

// give reward
let bal = Libs.ResourcesLib.userRes("balance")
bal.add(data.amount)

// mark claimed
data.claimed.push(user.telegramid)
Bot.setProperty("code_" + code, data, "json")

// notify claimer
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

// notify creator
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
