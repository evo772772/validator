const dm = require('./../messages');
const co = require('./../check-options');

module.exports = (options = {}) => (value) => {

	let { required, min, max, length, messages } = co(options, 'string');

	messages = { ...dm.string, required: dm.required, ...(messages || {}) };

	if (required) {
		if (typeof value === 'string') {
			if (value.trim().length === 0) throw messages.required;
		} else throw messages.string.base;
	}

	if (value === void 0 || value === null) return null;

	if (min && value.length < min) throw messages.string.min.replace(/{{min}}/, min);
	if (max && value.length > max) throw messages.string.max.replace(/{{max}}/, max);
	if (length && value.length !== length) throw messages.string.length.replace(/{{length}}/, length);

	return value;

}