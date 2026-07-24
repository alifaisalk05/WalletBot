/*CMD
  command: /claim_code
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

let code = message
let obj = Bot.getProperty("claimcode_" + code)

if (!obj) {
  Bot.sendMessage("❌ Invalid or expired code.")
  return
}

if (obj.claimed_by.includes(user.telegramid)) {
  Bot.sendMessage("⚠️ You already claimed this code.")
  return
}

if (obj.claimed >= obj.max_claims) {
  Bot.sendMessage("🚫 All claims have been used for this code.")
  return
}

let share = obj.total
let bal = Libs.ResourcesLib.userRes("balance")
bal.add(share)

obj.claimed += 1
obj.claimed_by.push(user.telegramid)
Bot.setProperty("claimcode_" + code, obj, "json")

Bot.sendMessage("✅ Success! You received ₹" + share.toFixed(2))
