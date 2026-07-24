/*CMD
  command: create_step_channels
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

let channels = message.split(",").map(c => c.trim());
if(channels.length === 0){
  Bot.sendMessage("❌ Enter at least one channel.");
  return;
}

User.setProperty("temp_channels", channels, "json");

// Generate code
let code = "MOYE-" + Math.floor(10000000 + Math.random() * 90000000);
let amt = User.getProperty("temp_amt");
let total = User.getProperty("temp_total");

let data = {
  amount_per_user: amt,
  total: total,
  channels: channels,
  claimed: []
};

Bot.setProperty("code_" + code, data, "json");

// Deduct total balance from creator
let bal = Libs.ResourcesLib.userRes("balance");
let totalDeduct = amt * total;
if(bal.value() < totalDeduct){
  Bot.sendMessage("❌ You do not have enough balance to create this code.");
  return;
}
bal.add(-totalDeduct);

Bot.sendMessage("✅ Code created successfully!\n\nCode: " + code + "\n💰 Amount per user: " + amt + "\n👥 Total users: " + total + "\n📢 Channels: " + channels.join(","));
