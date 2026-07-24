/*CMD
  command: /chapu
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

let testUrl = "https://pirate-check-membership-api.onrender.com/verify?token=8023468136:AAEj_0TV-YZYp98sjPe7VaywtaaA8NU2h1E&ch=@moyepy&userid=" + user.telegramid;

HTTP.get({
  url: testUrl,
  successCommand: "test_success",
  errorCommand: "test_error"
});
