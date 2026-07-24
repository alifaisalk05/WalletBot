/*CMD
  command: /withdraw_amount2
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

let min = 2
let max = 25

let amount = parseFloat(message)
let bal = Libs.ResourcesLib.userRes("balance")

if (isNaN(amount) || amount < min || amount > max || amount > bal.value()) {
  Bot.sendMessage("❌ Invalid amount. Must be ₹" + min + "–₹" + max + " and within your balance.")
  return
}

let upi_id = User.getProperty("upi_id")
if (!upi_id) {
  Bot.sendMessage("❗ You haven't linked your UPI ID.")
  return
}

// Apply 5% tax
let tax = amount * 0.05
let final_amount = amount - tax

User.setProperty("last_withdraw_amount", final_amount.toFixed(2), "string")
User.setProperty("last_tax_amount", tax.toFixed(2), "string")

let comment = encodeURIComponent("Withdraw from Wallet Bot by " + user.telegramid)

// RJWallet API
let url = "https://RJWallet.in/Api/api.php" +
          "?token=PUIQHKFW" +
          "&number=" + encodeURIComponent(upi_id) +
          "&amount=" + final_amount.toFixed(2) +
          "&comment=" + comment

bal.remove(amount)  // Remove full amount before tax
Bot.sendMessage("💳 Processing ₹" + final_amount.toFixed(2) + " after 5% fee...")

HTTP.get({
  url: url,
  success: "/withdraw_done"
})
