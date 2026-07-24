/*CMD
  command: prodep
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

/* CMD: dep_amount */

if (!message) {
  Bot.sendMessage("❌ Please enter a valid amount:");
  Bot.runCommand("dep_amount");
  return;
}

var amount = parseFloat(message);

if (isNaN(amount) || amount < 10) {
  Bot.sendMessage("❌ Minimum deposit amount is ₹10.");
  Bot.runCommand("dep_amount");
  return;
}

// Generate random 12-digit UTR
var utr = "";
for (var i = 0; i < 12; i++) {
  utr += Math.floor(Math.random() * 10);
}

// Build UPI deep link
var upi_link =
  "upi://pay?pa=paytm.s2znl0o@pty&am=" +
  amount +
  "&tr=" +
  utr;

// QR Image
var qr_link =
  "https://quickchart.io/qr?text=" +
  encodeURIComponent(upi_link) +
  "&size=500";

// Save deposit info
Bot.setProperty(
  "dep_" + user.telegramid,
  {
    amount: amount,
    utr: utr
  },
  "json"
);

// Send QR
Api.sendPhoto({
  photo: qr_link,
  caption:
    "💳 *Deposit Request*\n\n" +
    "💵 Amount: ₹`" + amount + "`\n" +
    "📌 UTR: `" + utr + "`\n\n" +
    "📲 Scan the QR above and complete the payment.\n\n" +
    "After payment, click the button below.",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "✅ Paid",
          callback_data: "/paid " + utr
        }
      ]
    ]
  },
  on_result: "/save_msgid"
});
