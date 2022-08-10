// @ts-nocheck
const Eris = require("eris");
let bot = new Eris('YOUR-BOT-TOKEN', {
	getAllUsers: true,
	intents: ['guildPresences', 'guildMembers', 'guilds', 'guildMessages'],
});

let prefix = "!";

const { stripIndents } = require("common-tags");
require("pluris")(Eris);

bot.on("ready", () => {
	console.log("Ready!");
	// You cna change the "idle" to "online", "dnd" or "invisible" (optional)
	// The type of the activity. 0 is playing, 1 is streaming (Twitch only), 2 is listening, 3 is watching, 5 is competing in
	bot.editStatus("idle", {name: "Template Simple bot stats", type: 1, url: "https://twitch.tv/discord"});
})

// Template Embed Pure (JSON)
bot.on("messageCreate", async message => {
	if (message.author.bot || !message.channel.guild) return;
	if (!message.content.startsWith(prefix)) return

	if(message.content.startsWith(`${prefix}embed1`)) {
		let embed = {
			title: 'Embed (from Object)',
			description: 'This is a Description',
			url: 'https://abal.moe/Eris/',
			timestamp: new Date(),
			color: 0x00ff00,
			footer: {
				text: 'This is a Footer',
				icon_url: 'https://source.unsplash.com/random',
			},
			img: {
			url: 'https://source.unsplash.com/random',
			},
			thumbnail: {
				url: 'https://source.unsplash.com/random',
			},
			fields: [
				{ name: "This is a Field", value: "This is a Field (Value)", inline: true },
			],
			author: {
				name: 'This is a Author',
				url: 'https://abal.moe/Eris/',
			}
		};

		return message.channel.createMessage({ embed: embed });
	}
})

// Template Embed Pluris (Add-on)
bot.on("messageCreate", async message => {
	if (message.author.bot || !message.channel.guild) return;
	if (!message.content.startsWith(prefix)) return;

	if (message.content.startsWith(`${prefix}embed2`)) {
		let embed = new Eris.RichEmbed()
			.setTitle("Embed (from Pluris)")
			.setDescription("This is a Description")
			.setFooter("This is a Footer")
			.addField("This is a Field", "This is a Field (Value)", true)

			return message.channel.createMessage({ embed: embed });
	}
})

// Simple Server Info Command
bot.on("messageCreate", async message => {
	if(message.author.bot) return;

	let msg = message.content.toLowerCase()
	if (!msg.startsWith(prefix)) return;

	if (msg.startsWith(prefix + "serverinfo")) {

		let vl = ["None", "Low", "Medium", "High", "Very High"];
		let verificationLevel = vl[message.channel.guild.verificationLevel];

		let members = {
			real: message.guild.members.filter(x => !x.bot).length.toLocaleString(),
			bot: message.guild.members.filter(x => x.bot).length.toLocaleString(),
			presence: {
				online: message.guild.members.filter(x => x.status === "online").length.toLocaleString(),
				idle: message.guild.members.filter(x => x.status === "idle").length.toLocaleString(),
				dnd: message.guild.members.filter(x => x.status === "dnd").length.toLocaleString(),
				offline: message.guild.members.filter(x => !x.status || x.status === "offline").length.toLocaleString()
			}
		}

		let roles = message.guild.roles.size.toLocaleString();
		let preferredLanguage = message.guild.preferredLocale.charAt(0).toUpperCase() + message.guild.preferredLocale.slice(1);

		let channels = {
			total: message.guild.channels.size.toLocaleString(),
			text: message.guild.channels.filter(x => x.type === 0).length.toLocaleString(),
			voice: message.guild.channels.filter(x => x.type === 2).length.toLocaleString(),
			categoy: message.guild.channels.filter(x => x.type === 4).length.toLocaleString()

		}

		let emojis = {
			static: message.guild.emojis.filter(x => !x.animated).length.toLocaleString(),
			animated: message.guild.emojis.filter(x => x.animated).length.toLocaleString(),
			total: message.guild.emojis.length.toLocaleString()
		}

		let icon;
		if (message.guild.icon) icon = message.guild.dynamicIconURL(message.guild.icon.startsWith("a_") ? "gif" : "png", 128);

		const embed = new Eris.RichEmbed()
			.setColor(0x00ff00)
			.setDescription(message.guild.description ? message.guild.description : 'No description')
			.setAuthor(message.guild.name)
			.addField(
				'Information',
				stripIndents`
				> **__Name:__** ${message.guild.name}
				> **__ID:__** ${message.guild.id}
				> **__Owner:__** <@!${message.guild.ownerID}>
				> **__Preferred Language:__** ${preferredLanguage}
				> **__Verification Level:__** ${verificationLevel}
				> **__Create At:__** ${new Date(message.guild.createAt).toLocaleString()}
		`,
			)
			.addField(
				'Statistics:',
				stripIndents`
				> **__Members:__** ${message.guild.memberCount} (${members.real} membros | ${members.bot} bots)
				> **__Roles:__** ${roles}
				> **__Channels:__** ${channels.total} (${channels.text} text | ${channels.voice} voice | ${channels.category} category)
				> **__Emojis:__** ${emojis.total} (${emojis.static} non-animated | ${emojis.animated} animated)
				> **__Status:__** ${members.presence.online} online | ${members.presence.idle} idle | ${members.presence.dnd} dnd | ${members.presence.offline} offline
		`,
			);

		if(message.guild.banner) embed.setImage(message.guild.dynamicBannerURL("png", 4096));
		if(message.guild.icon) embed.setAuthor(message.guild.name, icon, icon);

		return message.channel.createMessage({ embed: embed });
	}
})

bot.connect();
