/*CMD
  command: stats
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: stats 📊
  group: 
CMD*/

let stat = Bot.getProperty("" + user.telegramid + "")
let fullBotUsers = Bot.getProperty("wholeUsers") || []
let already = User.getProperty("already")

if (!already) {
  fullBotUsers.push(user.telegramid)
  Bot.setProperty("wholeUsers", fullBotUsers, "json")
  User.setProperty("already", true, "boolean")
}

if (stat == "ban") {
  Bot.sendMessage("❌ You are Banned from using this bot")
  return
}

let mode = Bot.getProperty("mode")
if (mode == "On") {
  Bot.sendMessage("⚠️ Bot is currently under maintenance. Please come back later.")
  return
}

let totalUsers = fullBotUsers.length

// Get date & time (safe method)
let free = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
let dt = free.split(",")[0]           // example: 6/23/2025
let tm = free.split(",")[1].trim()    // example: 4:21:55 PM

let inl = [[{ text: "🔄 Refresh", callback_data: "stats" }]]

let text =
  "*📊 Live Bot Statistics*\n\n" +
  "👥 *Total Users:* `" + totalUsers + "`\n\n" +
  "📅 *Date:* _" + dt + "_\n" +
  "⌚️ *Time:* _" + tm + "_\n\n" +
  "*👑 Powered by @eroxq*"

let chartConfig = {
  type: "bar",
  data: {
    labels: [""],
    datasets: [
      {
        label: "👥 Total Users",
        data: [totalUsers],
        backgroundColor: "#4e73df"
      }
    ]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "📊 Total Users"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
}

let chartUrl = "https://quickchart.io/chart?bkg=white&c=" + encodeURIComponent(JSON.stringify(chartConfig))

if (request.data) {
  Api.editMessageMedia({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    media: {
      type: "photo",
      media: chartUrl,
      caption: text,
      parse_mode: "Markdown"
    },
    reply_markup: { inline_keyboard: inl }
  })
} else {
  Api.sendPhoto({
    photo: chartUrl,
    caption: text,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: inl }
  })
}
