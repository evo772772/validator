const dm = require('./../messages');
const co = require('./../check-options');

module.exports = (options = {}) => (value) => {

	let { required, messages } = co(options, 'boolean');

	messages = { ...dm.boolean, required: dm.required, ...(messages || {}) };

	if (options.required) {
		if (value === void 0 || value === null) throw messages.required;
		if (typeof value !== 'boolean') throw messages.base;
	}

	if (typeof value !== 'boolean') return null;

	return value;

}