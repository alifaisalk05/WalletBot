/*CMD
  command: /withdraw_done2
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

let response = JSON.parse(content)
let status = response.status

let amt = parseFloat(User.getProperty("last_withdraw_amount"))
let total_deducted = amt / 0.95  // reverse 5% tax logic
let bal = Libs.ResourcesLib.userRes("balance")

if (status == "failed") {
  bal.add(total_deducted)

  let msg = "❌ *Withdrawal Failed!*\n\n" +
            "💸 Refunded: ₹" + total_deducted.toFixed(2) + "\n" +
            "📦 API Response:\n```json\n" +
            JSON.stringify(response, null, 2) + "\n```"

  Bot.sendMessage(msg, { parse_mode: "Markdown" })
} else {
  let tax = total_deducted - amt

  let msg = "✅ *Withdrawal Successful!*\n\n" +
            "💰 Sent: ₹" + amt.toFixed(2) + "\n" +
            "🧾 Tax Deducted: ₹" + tax.toFixed(2) + "\n" +
            "📦 API Response:\n```json\n" +
            JSON.stringify(response, null, 2) + "\n```"

  Bot.sendMessage(msg, { parse_mode: "Markdown" })
}
