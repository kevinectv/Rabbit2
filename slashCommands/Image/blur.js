const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);
const wait = require('util').promisify(setTimeout);
module.exports = {
	name: "blur",
    description: "Blur the user avatar",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "User": {
        name: "user",
        description: "Ping one of your friends to blur",
        required: false
      }
    },
    {
      "Integer": {
        name: "blur",
        description: "What blur do you want?",
        required: false
      }
    },
    ],
	run: async (client, interaction) => {
	try {
    const { member, options } = interaction;
    const { guild } = member;
    let prefix = client.settings.get(guild.id, "prefix");
    let color = client.settings.get(guild.id, `imagecolor`);
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    let user = options.getUser("user") || interaction.user;
    let blur = options.getInteger("blur") || 30;
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
    .setURL('https://www.youtube.com/watch?v=ifz-mai8pL4&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    if (blur < 2) {
    interaction.reply({ content: `<:attention:924255783695314964> **The blur must be higher than \`2\`... Try again...**`,  components: [row] })
    await wait(3000);
    await interaction.deleteReply();
    } else if (blur > 30) {
    interaction.reply({ content: `<:attention:924255783695314964> **The blur must be lower than \`30\`... Try again...**`,  components: [row] })
    await wait(3000);
    await interaction.deleteReply();
    } else {
    interaction.reply({ content: `<a:is_loading:923892698782511125> **Blurring user's image... Hold On...**`,  components: [row] })
    await wait(5000);
    const buffer = await AmeAPI.generate("blur", { url: user.displayAvatarURL({ format: "png", size: 2048 }), blur: blur });
    const attachment = new MessageAttachment(buffer, "blur.png");
    interaction.editReply({
    content: `**${emoji} Easily use this same command with \`${prefix}blur\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage('attachment://blur.png')
    ],
    files: [attachment],
    components: []  
    })
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