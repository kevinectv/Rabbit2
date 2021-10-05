const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = {
 name: "bird",
 aliases: ["birb"],
 description: "Sends a random bird image",
 category: "Image",
 usage: "bird",
 run: async (client, message, args) => {
  message.channel.startTyping();
  try {
   const options = {
    method: "GET",
    url: "https://some-random-api.ml/img/birb",
   };
   axios.request(options).then((response) => {
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTitle("🐦 Bird")
     .setImage(response.data.link);
     message.channel.stopTyping();
    message.lineReply(embed);
   });
  } catch (err) {
    const Anerror = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
    .setDescription(`\`\`\`${err}\`\`\``)
    .setFooter("Error in code: Report this error to kotlin0427")
    .setTimestamp();
    return message.lineReply(Anerror);
  }
 },
};
