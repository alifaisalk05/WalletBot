/*CMD
  command: /withdraw_amount1
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

let min = 15
let max = 500

let amount = parseFloat(message)
let bal = Libs.ResourcesLib.userRes("balance")

if (isNaN(amount) || amount < min || amount > max || amount > bal.value()) {
  Bot.sendMessage("❌ Invalid amount. Must be ₹" + min + "–₹" + max + " and within your balance.")
  return
}

let upi_id = User.getProperty("upi_id")
if (!upi_id) {
  Bot.sendMessage("❗ You haven't linked your Wallet.")
  return
}

// Deduct full amount from balance
bal.remove(amount)

// Apply 5% fee
let payout_amount = amount * 0.95  

let full_name = user.first_name + (user.last_name ? " " + user.last_name : "")
let username = user.username ? "@" + user.username : "N/A"

Bot.sendMessage(
  "💳 Withdrawal request of ₹" + payout_amount.toFixed(2) + 
  " (after 5% fee) has been submitted. Admin will process it soon."
)

// QR API (with final amount after fee)
let qr_url = "https://moye-qr-gen.vercel.app/api?upi=" + encodeURIComponent(upi_id) + "&amt=" + payout_amount.toFixed(2)

// Send QR to Admin
let admin_id = 6966950770  // Replace with your admin Telegram ID

Api.sendPhoto({
  chat_id: admin_id,
  photo: qr_url,
  caption:
    "📢 New Withdrawal Request\n\n" +
    "👤 Name: " + full_name + "\n" +
    "🆔 UserID: " + user.telegramid + "\n" +
    "🔗 Username: " + username + "\n" +
    "💳 UPI ID: " + upi_id + "\n" +
    "💰 Requested: ₹" + amount.toFixed(2) + "\n" +
    "💸 Payout (after 5% fee): ₹" + payout_amount.toFixed(2),
  reply_markup: {
    inline_keyboard: [
      [
        { text: "✅ Done", callback_data: "/withdraw_done " + user.telegramid }
      ]
    ]
  }
})
