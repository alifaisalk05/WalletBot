/*CMD
  command: claim_step2
  help: 
  need_reply: false
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
   Command: claim_step2
   ======================= */

let code = User.getProperty("claim_code")   // get stored code
let data = Bot.getProperty("code_" + code)
if(!data){ return } // safety check

let result = JSON.parse(content)

// check membership
if(!result.all_member){
  let notJoined = result.not_member_channels || []
  if(notJoined.length > 0){
    Bot.sendMessage("❌ You didn’t join these channels: Join the channels and claim the code again !\n" + notJoined.join(", "))
    return
  }
}

// give reward
let bal = Libs.ResourcesLib.userRes("balance")
bal.add(data.amount)

// mark claimed
data.claimed.push(user.telegramid)
Bot.setProperty("code_" + code, data, "json")

// notify claimer
Bot.sendMessage(
  "✅ Successfully claimed ₹" + data.amount.toFixed(2) + " from code `" + code + "`",
  { parse_mode: "Markdown" }
)

// notify creator
Bot.sendMessageToChatWithId(
  data.creator,
  "📢 *Code Claimed!*\n\n" +
  "👤 User: [" + (user.first_name || "Unknown") + "](tg://user?id=" + user.telegramid + ")\n" +
  "🆔 ID: `" + user.telegramid + "`\n" +
  "💰 Amount: ₹" + data.amount.toFixed(2) + "\n" +
  "🔑 Code: `" + code + "`",
  { parse_mode: "Markdown" }
)
