/*CMD
  command: /check_payment
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

/* CMD: check_payment */
let utr = params;
let dep = Bot.getProperty("dep_" + user.telegramid);

if (!dep || dep.utr != utr) {
  Bot.sendMessage("❌ Deposit not found.");
  return;
}

let json;
try {
  json = JSON.parse(content);
} catch (e) {
  Bot.sendMessage("⚠️ Could not parse payment response.\n\nResponse was:\n" + content);
  return;
}

// ✅ Safe check
let status = json && json.result && json.result.STATUS;

if (!status) {
  Bot.sendMessage("⚠️ Unexpected API response:\n" + content);
  return;
}

if (status == "TXN_SUCCESS") {
  // Add balance
  let wallet = Libs.ResourcesLib.userRes("balance");
  wallet.add(dep.amount);

  // Delete old QR
  if (dep.msgid) {
    Api.deleteMessage({
      chat_id: chat.chatid,
      message_id: dep.msgid
    });
  }

  // Clear deposit
  Bot.setProperty("dep_" + user.telegramid, null, "json");

  // Success message
  Bot.sendMessage("✅ Payment successful!\n💵 " + dep.amount + " has been added to your balance.");

  // Notify admin
  let ADMIN_ID = 6966950770;
  Api.sendMessage({
    chat_id: ADMIN_ID,
    text:
      "📥 New Deposit Received!\n\n" +
      "👤 User: @" + (user.username ? user.username : "NoUsername") +
      " (ID: " + user.telegramid + ")\n" +
      "💵 Amount: " + dep.amount + "\n" +
      "🧾 UTR: " + utr
  });

} else {
  // Payment not successful
  if (dep.msgid) {
    Api.deleteMessage({
      chat_id: chat.chatid,
      message_id: dep.msgid
    });
  }

  Bot.sendMessage("❌ You didn’t pay yet. Please try again.");
}
