/*CMD
  command: test_success
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

// test_success
Bot.sendMessage("✅ API reached!\nResponse:\n" + request.data);

// test_error
//Bot.sendMessage("❌ API failed!");
