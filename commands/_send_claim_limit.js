/*CMD
  command: /send_claim_limit
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


let limit = parseInt(message)
if (isNaN(limit) || limit <= 0) {
  Bot.sendMessage("❌ Enter a valid number.")
  return
}

let amt = parseFloat(User.getProperty("temp_amt"))  // amount per person
let total = amt * limit                             // total amount to deduct

let bal = Libs.ResourcesLib.userRes("balance")
if (bal.value() < total) {
  Bot.sendMessage("❌ You need ₹" + total + " to create this claim link.\n💰 Your balance: ₹" + bal.value().toFixed(2))
  return
}

let code = Math.floor(10000000 + Math.random() * 90000000)

let obj = {
  creator: user.telegramid,
  total: amt,
  max_claims: limit,
  claimed: 0,
  claimed_by: []
}

// Save the code like before
Bot.setProperty("claimcode_" + code, obj, "json")

// Track codes in user property
let my_codes = User.getProperty("my_claim_codes") || []
my_codes.push(code)
User.setProperty("my_claim_codes", my_codes, "json")

bal.remove(total)

Bot.sendMessage(
  "✅ *Gift Code Created!*\n\n" +
  "🔑 *Claim Code:* `" + code + "`\n" +
  "💸 *Amount per user:* ₹" + amt + 
  "\n👥 *Max Claims:* " + limit + 
  "\n💰 *Total Deducted:* ₹" + total + 
  "\n\n📝 Share this code. Users can claim it",
  { parse_mode: "Markdown" }
)
