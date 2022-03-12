const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const axios = require("axios").default;
module.exports = {
	name: "fact",
  description: "Shows a random fact about animal",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "String": {
        name: "animal",
        description: "what animal face do you want to see?",
        required: false
      }
    },
    ],
	run: async (client, interaction) => {
	try {
    const { member, options } = interaction;
    const { guild } = member;
    let prefix = client.settings.get(guild.id, "prefix");
    let color = client.settings.get(guild.id, `funcolor`);
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    let animal = options.getString("animal");
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setURL(client.global.get("global", "invite"))
    .setLabel("Invite")
    .setEmoji('924818034965766215')
    .setStyle("LINK"),

    new MessageButton()
    .setLabel('Vote')
    .setURL(client.global.get("global", "vote"))
    .setStyle('LINK')
    .setEmoji('924819119860224082'),
    
    new MessageButton()
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=sqJCa8xwd8k&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    if (!animal) {
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}fact\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("INPUT A NAME")
    .setDescription(`Please enter name of the animal. \`/fun fact cat\``)
    ],
    components: [row]
    });
    } else {
    const options = {
    method: "GET",
    url: `https://some-random-api.ml/facts/${animal}`,
    };
    axios
    .request(options)
    .then((response) => {
    interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}fact\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle(`${animal.toUpperCase()} FACT`)
    .setDescription(response.data.fact)
    ]
    });
    })
    .catch(() => {
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}fact\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle(`NO FACT`)
    .setDescription(`There are no facts about that animal`)
    ],
    components: [row]
    });
    });
    }      
	} catch (e) {
    console.log(e.stack ? e.stack : e)
    interaction.editReply({
    embeds: [
    new MessageEmbed()
    .setColor("#ff0079")
    .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
    .setFooter("Error in code: Report this error to kotlin#0427")
    .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
    ],
    });
	}
	}
}