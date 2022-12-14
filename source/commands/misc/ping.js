const { Command } = require('../../structures');

module.exports = class PingCommand extends Command {
	constructor() {
		super({
			name: 'ping',
			category: 'misc',
			description: 'Bot latency',
		});
	}
	async run(message) {
		message.reply('botLatency', { latency: message.guild.shard.latency });
	}
};
