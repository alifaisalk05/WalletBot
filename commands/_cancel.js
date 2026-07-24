/*CMD
  command: /cancel
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

let parts = message.split(" ");
let uid = parts[1];
let amt = parts[2];

if (!uid || !amt) {
  Bot.sendMessage("⚠️ Invalid cancel command format.");
  return;
}

// Notify user
Api.sendMessage({
  chat_id: uid,
  text: "❌ *Your payment of ₹*" + amt + "* was unsuccessful*",
  parse_mode: "Markdown"
});

// Delete admin message
Api.deleteMessage({
  chat_id: request.message.chat.id,
  message_id: request.message.message_id
});
