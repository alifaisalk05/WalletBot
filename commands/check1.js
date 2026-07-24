/*CMD
  command: check1
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

let status = options.result.status;

if (status == "left" || status == "kicked") {
  Bot.sendMessage("❗️You haven't joined our all channels");
} else {
  let id = Bot.getProperty("check_user_id");
  let channel2 = "@csmmbofficial";  // Replace with your 2nd channel
  Api.getChatMember({
    chat_id: channel2,
    user_id: id,
    on_result: "check2"
  });
}
