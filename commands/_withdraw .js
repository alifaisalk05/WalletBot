/*CMD
  command: /withdraw 
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: lifafa wala
  group: 
CMD*/

let bal = Libs.ResourcesLib.userRes("balance")

Bot.sendMessage("💰 Your Balance: ₹" + bal.value() + "\n\nEnter amount to withdraw (Min ₹" + min + ", Max ₹" + max + ").\n*5% tax* will be deducted.", {parse_mode: "Markdown"})
Bot.runCommand("/withdraw_amount3")
