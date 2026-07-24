/*CMD
  command: /setch
  help: 
  need_reply: false
  auto_retry_time: 
  folder: CHANNEL

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: set channels 🚀
  group: 
CMD*/

/* =======================
   Command: /setch
   ======================= */

Bot.sendMessage("📢 Please send the channel usernames separated by commas.\nPlease make bot admin in that channels ⚠️\n\nExample:\n`@ch1,@ch2,@ch3`\n", { parse_mode: "Markdown" })

Bot.runCommand("setch_step2")
