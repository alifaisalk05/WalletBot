/*CMD
  command: /sharechannel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: get channel id
  group: 
CMD*/

let kb = {
  keyboard: [
    [
      {
        text: "📢 Share Channel",
        request_chat: {
          request_id: 1,
          chat_is_channel: true,
          bot_is_member: true
        }
      }
    ]
  ],
  resize_keyboard: true,
  one_time_keyboard: true
}

Bot.sendKeyboard(kb, "📢 Tap the button below and select your channel.")
