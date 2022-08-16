const Embed = require('../embed/Embed');
const embed = new Embed();
const c = require('colors');
const moment = require('moment');
moment.locale('pt-br');

module.exports = class Logger {
	constructor(client) {
		this.client = client;
	}
	static send(message) {
		return console.log(c.green(`[${moment(Date.now()).format('hh:mm')}] ${message}`));
	}
	static warn(message) {
		return console.log(c.yellow(`[${moment(Date.now()).format('hh:mm')}] ${message}`));
	}
	async error(error) {
		embed.setTitle(
			'Ocorreu um erro inesperado...',
			'https://cdn.discordapp.com/emojis/1005192372738601001.webp?size=128&quality=lossless'
		);
		embed.setDescription(`\`\`\`fix\n${error.stack}\`\`\``);
		const channels = await this.client.getRESTGuildChannels('1002270483850465441');
		for (const channel of channels) {
			if (channel.id !== '1002270892862214246') continue;
			const webhooks = await channel.getWebhooks();
			var webhook = webhooks.filter((w) => w.name === `${this.client.user.username} Tracker`)[0];
			if (!webhook)
				webhook = await channel.createWebhook({ name: this.client.user.username, avatar: this.client.user.avatarURL });
			this.client.executeWebhook(webhook.id, webhook.token, {
				embed,
				username: `${this.client.user.username} Tracker`,
				avatarURL: this.client.user.avatarURL,
			});
			console.log(c.red(`[${moment(Date.now()).format('hh:mm')}] ${error.stack}`));
		}
	}
};
