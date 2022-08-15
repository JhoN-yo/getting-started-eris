const { Listener, Logger } = require('../../structures/');

module.exports = class ReadyListener extends Listener {
	constructor() {
		super({ name: 'ready' });
	}
	async on() {
		Logger.send(`Logged as ${this.client.user.username}#${this.client.user.discriminator}`);
		const editClientStatus = async () => {
			const activities = [
				{
					name: 'with you',
					type: 3,
				},
				{
					name: `${this.client.users.filter((user) => !user.bot).length} users`,
					type: 3,
				},
				{
					name: 'Genshin Impact',
					type: 1,
					url: 'https://www.twitch.tv/voidappend',
				}
			];
			const activity = activities[Math.floor(Math.random() * activities.length)];
			this.client.editStatus('online', activity);
		};
	}
};
