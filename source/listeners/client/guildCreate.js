
const { Listener, Embed } = require('../../structures');
const { Guild } = require('../../database');

module.exports = class GuildCreateListener extends Listener {
	constructor() {
		super({ name: 'guildCreate' });
	}
	async on(guild) {
		const g = await Guild.findById(guild.id);
		if (g?.banned) guild.leave();

		const owner = this.client.users.get(guild.ownerID);
		const embed = new Embed();
		embed.setColor('#43b581');
		embed.setDescription(`> *I'm currently in ${this.client.guilds.size} servers*`);
		embed.setAuthor(
			`${this.client.user.username} has joined ${guild.name}`,
			'https://cdn.discordapp.com/emojis/1005192455253143764.webp?size=128&quality=lossless',
		);
		embed.setImage(guild.iconURL);
		embed.addField(`\u200b\n> __Guild:__`, `\`\`\`yaml\n${guild.name} | ${guild.id}\`\`\``, true);
		embed.addField(
			`\u200b\n> __Members:__`,
			`\`\`\`yaml\n${guild.members.filter((member) => !member.bot).length} users | ${
				guild.members.filter((member) => member.bot).length
			} bots\`\`\``,
			true,
		);
		embed.addField(`> __Owner:__`, `\`\`\`yaml\n${owner.username}#${owner?.discriminator} | ${owner.id}\`\`\``);
		const channels = await this.client.getRESTGuildChannels('1002270483850465441');
		for (const channel of channels) {
			if (channel.id !== '1002270892862214246') continue;
			const webhooks = await channel.getWebhooks();
			var webhook = webhooks.filter((w) => w.name === `${this.client.user.username} Tracker`)[0];
			if (!webhook) webhook = await channel.createWebhook({
				name: `${this.client.user.username} Tracker`,
				avatar: this.client.user.avatarURL,
			});
			this.client.executeWebhook(webhook.id, webhook.token, {
				embed,
				avatarURL: this.client.user.avatarURL,
				username: `${this.client.user.username} Tracker`
			});
		}
	}
};
