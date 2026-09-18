/*CMD
  command: /setch
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CHANNEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: set channels 🚀
  group: 
CMD*/

Bot.sendMessage(
  "📢 Send channels separated by commas.\n\n" +
  "✅ Public:\n" +
  "@channel1,@channel2\n\n" +
  "🔒 Private:\n" +
  "https://t.me/+K2q4xD2zDv82NDZi -1004300578409\n\n" +
  "You can mix both: and if private channel, then send private channel link space channel id\nGet Channel ID from this bot @userinfobot\n\n" +
  "@channel1,https://t.me/+K2q4xD2zDv82NDZi -1004300578409",
  {
    parse_mode: "Markdown"
  }
)

Bot.runCommand("settch2")
