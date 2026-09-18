/*CMD
  command: /tip
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

// Command: /tip

if (!request.reply_to_message) {
  Bot.sendMessage(
    "❌ Reply to a user's message.\n\nExample:\n<code>/tip 100</code>"
  );
  return;
}

let args = message.trim().split(" ");

if (args.length < 2) {
  Bot.sendMessage(
    "❌ Usage:\n<code>/tip &lt;amount&gt;</code>"
  );
  return;
}

let amount = parseFloat(args[1]);

if (isNaN(amount) || amount <= 0) {
  Bot.sendMessage("❌ Enter a valid amount.");
  return;
}

let receiverId = request.reply_to_message.from.id;

if (receiverId == user.telegramid) {
  Bot.sendMessage("❌ You can't tip yourself.");
  return;
}

// Sender balance
let senderBal = Libs.ResourcesLib.userRes("balance");

if (senderBal.value() < amount) {
  Bot.sendMessage("❌ You don't have enough balance.");
  return;
}

// Receiver balance
let receiverBal = Libs.ResourcesLib.anotherUserRes(
  "balance",
  receiverId
);

// Transfer
senderBal.remove(amount);
receiverBal.add(amount);

// Group message
Bot.sendMessage({
  text:
    "💸 <a href='tg://user?id=" + user.telegramid + "'>" +
    (user.first_name || "User") +
    "</a> tipped <b>" + amount + "</b> to <a href='tg://user?id=" +
    receiverId + "'>" +
    (request.reply_to_message.from.first_name || "User") +
    "</a> 🎉",
  parse_mode: "HTML",
  disable_web_page_preview: true
});

// Notify receiver in PM
Api.sendMessage({
  chat_id: receiverId,
  text:
    "🎉 You received <b>" + amount + "</b> Rs through group tip from <a href='tg://user?id=" +
    user.telegramid + "'>" +
    (user.first_name || "User") +
    "</a>.",
  parse_mode: "HTML"
});
