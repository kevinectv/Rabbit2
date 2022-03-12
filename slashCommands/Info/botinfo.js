const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require("../../config");
const moment = require("moment");
const os = require("os");
const osutils = require("os-utils");
require("moment-duration-format");
const { dependencies } = require("../../package.json");
module.exports = {
	name: "botinfo",
	description: "Shows Information about the Bot",
	cooldown: 3,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
		try {
        const { member } = interaction;
		const { guild } = member;
        let prefix = client.settings.get(guild.id, "prefix");
        let color = client.settings.get(guild.id, `colorlike`);
        let pointer = client.settings.get(guild.id, `pointer`);
        let Kotlin = client.global.get("global", `kotlin`);
        let version = client.global.get("global", `version`);
        let emoji = client.settings.get(guild.id, "SlashEmoji");
        function capitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const row = new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setURL(client.global.get("global", "invite"))
        .setLabel("Invite")
        .setEmoji('924818034965766215')
        .setStyle("LINK"),

        new MessageButton()
        .setLabel('Support Server')
        .setURL(client.global.get("global", "support"))
        .setStyle('LINK')
        .setEmoji('924818382908440606'),

        new MessageButton()
        .setLabel('Vote')
        .setURL(client.global.get("global", "vote"))
        .setStyle('LINK')
        .setEmoji('924819119860224082'),

        new MessageButton()
        .setLabel('Instagram')
        .setURL("https://www.instagram.com/fumigramapp")
        .setStyle('LINK')
        .setEmoji('924819412505223188'),
        )
        interaction.reply({
        content: `**${emoji} Easily use this same command with \`${prefix}info\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle(`${client.user.username.toUpperCase()} GENERIC INFORMATION`)
        .setDescription(`
        ${pointer} **Prefix** - \`${prefix}\`
        ${pointer} **Version** - \`${version}\`
        ${pointer} **Count** - \`${client.guilds.cache.size}\` guilds
        ${pointer} **Uptime** - \`${duration}\`
        ${pointer} **Node** - \`${process.version}\`
        ${pointer} **Platform** - \`${capitalizeFirstLetter(osutils.platform())}\`
        ${pointer} **Discord.js** - \`${dependencies["discord.js"].replace("^", "v")}\`
        ${pointer} **Ping** - \`${Math.round(client.ws.ping)}\` ms
        ${pointer} **User Count** - \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\` members
        ${pointer} **Channel Count** - \`${client.channels.cache.size}\` channels
        ${pointer} **Rabbit Developer** - <@${config.ownerid}> | [[Website](${config.authorwebsite})\]
        ${pointer} **CPU** - \`${(os.cpus()[0].model.substring(0, os.cpus()[0].model.indexOf("CPU")) || "Intel Xeon (" + osutils.cpuCount() + " cores)")}\`
        ${pointer} **Total Memory** - \`${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}\` MB
        ${pointer} **RAM Usage (VPS)** - \`${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split(" ")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\`
        ${pointer} **RAM Usage (BOT)** - \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB " + `(${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)}%)`}\`
        ${pointer} **Useful Links** - [Support server](${client.global.get("global", "support")}) | [Website](https://rabbit.fumigram.com) | [Invite me](${client.global.get("global", "invite")})
        `)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048})) 
        .setFooter("Rabbit by Kotlin#0427", Kotlin)
        .setTimestamp()
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