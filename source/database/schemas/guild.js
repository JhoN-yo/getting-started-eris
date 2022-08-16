const { Schema, model } = require('mongoose');

const guild = new Schema({
	_id: String,
	prefix: String,
	allowedChannels: { type: Array, default: [] },
});

module.exports = model('guilds', guild);

