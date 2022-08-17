const { Constants } = require('eris');

module.exports = class SelectMenu {
	constructor() {
		this.type = Constants.ComponentTypes.SELECT_MENU;
		this.custom_id = null;
		this.placeholder = null;
		this.options = [];
		this.min_values = null;
		this.max_values = null;
		this.disabled = null;
	}

	/**
	 * @param {string} placeholder Select menu placeholder
	 * @returns {SelectMenu}
	 */
	setPlaceholder(placeholder) {
		return this.placeholder = placeholder;
	}

	/**
	 *
	 * @param {string} label Select menu text
	 * @param {string} description Select menu description
	 * @param {string} value Select menu value
	 * @param {string} emoji Select menu emoji
	 * @returns {SelectMenu}
	 */
	addOption(label, description, value, emoji) {
		if(isNaN(emoji)) return this.options.push({ label, desciprtion, value, emoji: { name: emoji}});
		else return this.options.push({ label, description, value, emoji: { id: emoji}});
	}

	/**
	 * @param {number} number Minimum amount of selections the user can make
	 * @returns {SelectMenu}
	 */
	setMinValues(number = 1) {
		return this.min_values = number;
	}

	/**
	 * @param {number} number Maximum amount of selections the user can make
	 * @returns {SelectMenu}
	 */
	setMaxValues(number = 1) {
		return this.max_values = number;
	}

	/**
	 * @param {boolean} disabled Select menu disabled
	 * @returns {SelectMenu}
	 */
	setDisabled(disabled = true) {
		return this.disabled = disabled;
	}

	/**
	 * @param {string} customID Select menu customID
	 * @returns {SelectMenu}
	 */
	setCustomID(customID) {
		return this.custom_id = customID;
	}
}


