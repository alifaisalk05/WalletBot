/*CMD
  command: check2
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

let status = options.result.status;

if (status == "left" || status == "kicked") {
  Bot.sendMessage("❗️You haven't joined our all channels");
} else {
  // User is in both channels
 // Bot.sendMessage("✅ You have joined both channels. Welcome!");
  Bot.runCommand("/mainfeed")
  // You can continue with your bot's main features here
}
