/*CMD
  command: settch2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!message) {
  Bot.sendMessage("❌ Invalid input.")
  Bot.runCommand("setch_step2")
  return
}

let input = message.split(",")

let verifyChannels = []
let privateLinks = {}

for (let i = 0; i < input.length; i++) {

  let item = input[i].trim()

  // Private channel
  if (item.startsWith("https://t.me/+")) {

    // Split by one or more spaces
    let p = item.split(/\s+/)

    if (p.length < 2) {
      Bot.sendMessage(
        "❌ Invalid private channel format.\n\nExample:\nhttps://t.me/+K2q4xD2zDv82NDZi -1004300578409"
      )
      Bot.runCommand("setch_step2")
      return
    }

    let link = p[0]
    let id = p[1]

    verifyChannels.push(id)
    privateLinks[id] = link

  } else {

    if (!item.startsWith("@")) {
      item = "@" + item
    }

    verifyChannels.push(item)

  }
}

// Always require your wallet channel
verifyChannels.push("@MoyeWallet")

// Remove duplicates
verifyChannels = [...new Set(verifyChannels)]

// Save
User.setProperty("required_channels", verifyChannels, "json")
User.setProperty("private_links", privateLinks, "json")

Bot.sendMessage(
  "✅ Required channels saved successfully!"
)
