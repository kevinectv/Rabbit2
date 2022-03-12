const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	name: "pepe",
    description: "Show user PP size",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "User": {
        name: "user",
        description: "Ping a user to see their pp size",
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
    const user = options.getUser("user") || interaction.user;
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
    .setURL('https://www.youtube.com/watch?v=nkQZ1RDoBD4&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    const pepe = "8" + "=".repeat(Math.floor(Math.random() * 15)) + "D";
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}pepe\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("Pe-pe")
    .setDescription(`${user}, your pepe is **${pepe}** long!`)
    ],
    components: [row]
    });
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