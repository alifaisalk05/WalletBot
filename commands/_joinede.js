/*CMD
  command: /joinede
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

let stat = Bot.getProperty("" + user.telegramid + "?Ban");

if (stat == "ban") {
  Bot.sendMessage("*You're Banned From Using The Bot ❌*");
} else {
  let id = user.telegramid;
  Bot.setProperty("check_user_id", id, "integer");  // Save ID to use later

  let channel1 = "@moyepy";  // Replace with your 1st channel
  Api.getChatMember({ 
    chat_id: channel1,
    user_id: id,
    on_result: "check1"
  });
}
