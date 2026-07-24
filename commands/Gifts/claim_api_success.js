/*CMD
  command: claim_api_success
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

// Get the code stored earlier
let code = User.getProperty("claim_code");  
let data = Bot.getProperty("code_" + code, "json");  

let result = JSON.parse(request.data); // API response

if(result.missing_channels && result.missing_channels.length > 0){
  Bot.sendMessage("❌ You didn't join these channels: " + result.missing_channels.join(", ") + "\nJoin them and retry.");
  return;
}

// Add balance to user
let bal = Libs.ResourcesLib.userRes("balance");
bal.add(data.amount_per_user); // make sure your property matches

// Mark user as claimed
data.claimed.push(user.telegramid);
Bot.setProperty("code_" + code, data, "json");

Bot.sendMessage("✅ Code claimed successfully! You received ₹" + data.amount_per_user);
