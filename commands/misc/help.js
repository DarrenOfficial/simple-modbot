const Discord = require("discord.js");
const colors = require("../../config/colors.json");

module.exports.run = async (client, message, args) => {
  let help = new Discord.MessageEmbed()
    .setTitle("Nebula Moderation bot")
    .setColor(colors.death)
    .setTimestamp(message.createdAt)
    .setDescription(`
      **General·**
      help
      **Moderation·**
      ban • unban • kick • mute • unmute • warn • unwarn • warnings`);

    return message.channel.send(help);
};

module.exports.help = {
  name: "help",
};
