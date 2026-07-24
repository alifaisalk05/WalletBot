/*CMD
  command: /paid
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

/* CMD: paid */
let utr = params;
if (!utr) {
  Bot.sendMessage("❌ Invalid UTR.");
  return;
}

let dep = Bot.getProperty("dep_" + user.telegramid);
if (!dep || dep.utr != utr) {
  Bot.sendMessage("❌ No matching deposit found.");
  return;
}

// ✅ Use HTTPS to avoid redirect
let api_url =
  "https://paytm.khna04221.workers.dev/?mid=hAsqwQ85709194299740&order=" +
  utr;

HTTP.get({
  url: api_url,
  success: "/check_payment " + utr
});
