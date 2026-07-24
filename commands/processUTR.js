/*CMD
  command: processUTR
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let utr = message;
let amount = User.getProperty("pending_amount");
let uid = user.telegramid;
let username = user.username ? "@" + user.username : "No username";

// Escape special characters in name for HTML safety
let safeName = user.first_name.replace(/</g, "&lt;").replace(/>/g, "&gt;");

if (!utr || utr.length < 6) {
  Bot.sendMessage("❌ Invalid UTR. Try again:");
  Bot.runCommand("processUTR");
  return;
}

// Notify user
Bot.sendMessage("✅ *Wait, your payment of UTR No.* `" + utr + "` *is being processed*", { parse_mode: "Markdown" });

// Admin alert message
let msg = "📥 <b>New Deposit Request</b>\n\n" +
          "👤 <b>Name:</b> <a href='tg://user?id=" + uid + "'>" + safeName + "</a>\n" +
          "🆔 <b>User ID:</b> <code>" + uid + "</code>\n" +
          "🔗 <b>Username:</b> " + username + "\n\n" +
          "💰 <b>Amount:</b> ₹" + amount + "\n" +
          "🧾 <b>UTR:</b> <code>" + utr + "</code>";

Api.sendMessage({
  chat_id: 6966950770, // Replace with your admin ID
  text: msg,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "✅ Confirm", callback_data: "/lemazale " + uid + " " + amount },
        { text: "❌ Cancel", callback_data: "/cancel " + uid + " " + amount }
      ]
    ]
  }
});
