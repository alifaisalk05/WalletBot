/*CMD
  command: /save_msgid
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

/* CMD: save_msgid */

var dep = Bot.getProperty("dep_" + user.telegramid);

if (!dep) return;

dep.msgid = options.result.message_id;

Bot.setProperty(
  "dep_" + user.telegramid,
  dep,
  "json"
);
