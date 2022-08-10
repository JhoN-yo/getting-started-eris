// @ts-nocheck
const Eris = require("eris");
let bot = new Eris('YOUR_BOT_TOKEN');
let prefix = "!"; 

require("pluris")(Eris);

bot.on("ready", () => {
	console.log("Ready!");
	// You cna change the "idle" to "online", "dnd" or "invisible" (optional)
	// The type of the activity. 0 is playing, 1 is streaming (Twitch only), 2 is listening, 3 is watching, 5 is competing in
	bot.editStatus("idle", {name: "Template Simple bot stats", type: 1, url: "https://twitch.tv/discord"});
})

bot.on("messageCreate", async message => {
	if (message.author.bot || !message.channel.guild) return;
	if (!message.content.startsWith(prefix)) return

	if(message.content.startsWith(`${prefix}embed1`)) {
		// Template Embed Pure (JSON)
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

bot.on("messageCreate", async message => {
	if (message.author.bot || !message.channel.guild) return;
	if (!message.content.startsWith(prefix)) return;

	if (message.content.startsWith(`${prefix}embed2`)) {
		// Template Embed Pluris (Add-on)
		let embed = new Eris.RichEmbed()
			.setTitle("Embed (from Pluris)")
			.setDescription("This is a Description")
			.setFooter("This is a Footer")
			.addField("This is a Field", "This is a Field (Value)", true)

			return message.channel.createMessage({ embed: embed });
	}
})

bot.connect();
