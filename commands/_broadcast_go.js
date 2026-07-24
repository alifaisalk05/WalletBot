/*CMD
  command: /broadcast_go
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Message 

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let allowedAdmins = ["6966950770", "7794748938"]  // replace with your two user IDs

if (!allowedAdmins.includes(user.telegramid.toString())) {
  Bot.sendMessage("❌ You are not authorized to use this command.")
  return
}

let users = Bot.getProperty("wholeUsers", [])
for (let i in users) {
  Bot.sendMessageToChatWithId(users[i], message)
}
Bot.sendMessage("✅ Message sent to " + users.length + " users.")
