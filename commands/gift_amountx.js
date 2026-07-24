/*CMD
  command: gift_amountx
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* gift_amount command */
let amt = parseFloat(message)

if (isNaN(amt) || amt <= 0) {
  Bot.sendMessage("❌ Enter a valid amount.")
  Bot.runCommand("gift_amount")
  return
}

let total_codes = User.getProperty("temp_limit")
let total = amt * total_codes

let bal = Libs.ResourcesLib.userRes("balance")

if (bal.value() < total) {
  Bot.sendMessage("❌ You need ₹" + total + " to create these codes.\n💰 Your balance: ₹" + bal.value().toFixed(2))
  return
}

bal.remove(total)

let my_codes = User.getProperty("my_claim_codes") || []
let codes_text = "✅ *Gift Codes Created!*\n\n"

for (let i = 0; i < total_codes; i++) {
  let code = "MOYE-" + Math.floor(10000000 + Math.random() * 90000000)

  let obj = {
    creator: user.telegramid,
    total: amt,
    max_claims: 1,      // each code can only be claimed once
    claimed: 0,
    claimed_by: []
  }

  Bot.setProperty("claimcode_" + code, obj, "json")

  my_codes.push(code)

  codes_text += "🔑 *Code " + (i+1) + ":* `" + code + "`\n"
}

User.setProperty("my_claim_codes", my_codes, "json")

codes_text += "\n💸 *Amount per code:* ₹" + amt +
              "\n👥 *Total Codes:* " + total_codes +
              "\n💰 *Total Deducted:* ₹" + total +
              "\n\n📝 Share these codes. Users can claim them."

Bot.sendMessage(codes_text, { parse_mode: "Markdown" })
