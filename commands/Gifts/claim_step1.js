/*CMD
  command: claim_step1
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

let code = message.toUpperCase()
let data = Bot.getProperty("code_" + code)

if(!data){
  Bot.sendMessage("❌ Invalid or expired code.")
  return
}

// check if user already claimed
if(data.claimed.includes(user.telegramid)){
  Bot.sendMessage("⚠️ You already claimed this code.")
  return
}

// check if claim limit reached
if(data.claimed.length >= data.limit){
  Bot.sendMessage("❌ This code has reached its claim limit.")
  return
}

// ✅ store code in user property for next step
User.setProperty("claim_code", code, "string")

// now verify membership via API
let apiUrl = "https://pirate-check-membership-api.onrender.com/verify" +
             "?token=8159741259:AAFINHh9Lk3s0Mpx-I8hno56alD2k8au9XA" +
             "&ch=" + data.channels.join(",") +
             "&userid=" + user.telegramid

HTTP.get({
  url: apiUrl,
  success: "claim_step2",
  error: "claim_api_error"
})
