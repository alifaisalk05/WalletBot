/*CMD
  command: /done_q
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

/* Command: /withdraw_done */
let parts = params.split(" ")
if (!parts[0]) return

let user_id = parts[0]

// Tell admin
Bot.sendMessage("✅ You marked withdrawal as processed.")

// Tell the user
Api.sendMessage({
  chat_id: user_id,
  text: "✅ Admin processed your withdrawal. Please check your payment app."
})
