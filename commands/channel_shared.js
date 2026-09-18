/*CMD
  command: channel_shared
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

/* Command: channel_shared */

if (!request.chat_shared) {
  return
}

let chat = request.chat_shared

Bot.sendMessage(
  "✅ Channel received!\n\n" +
  "🆔 Channel ID:\n" +
  "`" + chat.chat_id + "`",
  {
    parse_mode: "Markdown"
  }
)
