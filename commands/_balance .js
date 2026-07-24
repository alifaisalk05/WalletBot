/*CMD
  command: /balance 
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 💸 balance
  group: 
CMD*/

let bal = Libs.ResourcesLib.userRes("balance")
Bot.sendMessage("💼 Your current balance is: ₹" + bal.value())
