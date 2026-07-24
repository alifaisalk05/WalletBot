/*CMD
  command: setch_step2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: CHANNEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* =======================
   Command: setch_step2 (FINAL)
   ======================= */

if (!message) {
  Bot.sendMessage("❌ Invalid input. Please send channel usernames separated by commas.")
  Bot.runCommand("setch_step2")
  return
}

// 🧹 Clean and split input
let channels = message.split(",").map(function(ch) {
  return ch.trim()
}).filter(Boolean)

// 🏷 Always include @moyepy and remove duplicates
channels.push("@moyepy")
channels = Array.from(new Set(channels))

// 🧩 Prevent abuse (max 10 channels)
if (channels.length > 10) {
  channels = channels.slice(0, 10)
}

// ⚠️ Check again if valid
if (channels.length === 0) {
  Bot.sendMessage("❌ No valid channels found. Please try again.")
  Bot.runCommand("setch_step2")
  return
}

// 💾 Save properly as JSON array
User.setProperty("required_channels", channels, "json")

// ✅ Confirmation (HTML mode — safe for underscores)
Bot.sendMessage(
  "✅ <b>Required channels saved successfully!</b>\n\n" +
  "📢 <b>Channels:</b> <code>" + channels.join(", ") + "</code>",
  { parse_mode: "HTML" }
)
