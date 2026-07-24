/*CMD
  command: /lemazale
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
let amt = parseFloat(parts[2]);

if (!uid || isNaN(amt)) {
  Bot.sendMessage("⚠️ Invalid confirm command format.");
  return;
}

// Credit balance
let bal = Libs.ResourcesLib.anotherUserRes("balance", uid);
bal.add(amt);

// Notify user
Api.sendMessage({
  chat_id: uid,
  text: "🎉 *Deposit of ₹" + amt + " successful. Balance has been added.*",
  parse_mode: "Markdown"
});

// Delete admin message
Api.deleteMessage({
  chat_id: request.message.chat.id,
  message_id: request.message.message_id
});
