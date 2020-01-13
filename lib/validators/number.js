const dm = require('./../messages');
const co = require('./../check-options');

const number = (options = {}) => (value) => {

	let { required, min, max, int, float, messages } = co(options, 'number');

	messages = { ...dm.number, required: dm.required, ...(messages || {}) };

	if (required) {
		if (value === void 0 || value === null) throw messages.required;
		if (typeof value !== 'number') throw messages.base;
	}

	if (typeof value !== 'number') return null;

	if (int && !/^\d{1,}$/.test(value.toString())) throw messages.int;
	if (float && !/^\d{1,}.\d{1,}$/.test(value.toString())) throw messages.float;

	if (typeof min === 'number' && typeof max === 'number' && (value < min || value > max))
		throw messages.between
			.replace(/{{min}}/, min)
			.replace(/{{max}}/, max);

	if (typeof min === 'number' && value < min) throw messages.min.replace(/{{min}}/, min);
	if (typeof max === 'number' && value > max) throw messages.max.replace(/{{max}}/, max);

	return value;

};

module.exports = number;
