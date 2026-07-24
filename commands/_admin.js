/*CMD
  command: /admin
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

let admin = Bot.getProperty("SuperAdminID")
let secondAdmin = 7772394737

if (user.telegramid != admin && user.telegramid != secondAdmin) {
  Bot.sendMessage("❌ You are not authorized.")
  return
}

Bot.sendInlineKeyboard(
  [
    [{ title: "➕ Add Coins", command: "/add" }, { title: "💳 View Users", command: "/users" }],
    [{ title: "📢 Broadcast", command: "/broadcast" }, { title: "⛔ Ban / Unban", command: "/ban" }],
    [{ title: "🚫 Remove Coins", command: "/remove" }]
  ],
  "👑 *Admin Panel*", {parse_mode: "Markdown"}
)
