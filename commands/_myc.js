/*CMD
  command: /myc
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: gift created 💝
  group: 
CMD*/

let code_list = User.getProperty("my_claim_codes")
if (!code_list || code_list.length == 0) {
  Bot.sendMessage("❌ You haven't created any claim codes.")
  return
}

let result = []

for (var i = 0; i < code_list.length; i++) {
  let code = code_list[i]
  let data = Bot.getProperty("claim_code_" + code)
  
  if (data && data.claimed < data.max_claims) {
    let remaining = data.max_claims - data.claimed
    result.push("🔑 *Code:* `" + code + "`\n💸 Amount: ₹" + data.total + "\n👥 Left: " + remaining + "/" + data.max_claims)
  }
}

if (result.length == 0) {
  Bot.sendMessage("📭 You have no active claim codes.")
} else {
  Bot.sendMessage("📦 *Your Active Claim Codes:*\n\n" + result.join("\n\n"), { parse_mode: "Markdown" })
}
