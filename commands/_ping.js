/*CMD
  command: /ping
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

// Step 1: Send initial message
Bot.sendMessage("🏓 Pinging...")

// Step 2: Run after 1 second to edit message
Bot.run({
  run_after: 1, // 1 second delay
  command: "ping_finish",
})

// Step 3: Edit message to show "Pong!"
on("ping_finish", function() {
  Bot.editMessage("🏓 Pong! ✅", request.message_id)
})
