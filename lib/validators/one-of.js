const dm = require('./../messages');
const co = require('./../check-options');

module.exports = (options = {}) => (value) => {

	let { required, values, messages } = co(options, 'oneof');

	messages = { ...dm.oneof, required: dm.required, ...(messages || {}) };

	if (required && (value === void 0 || value === null)) throw messages.required;
	if (value === void 0 || value === null) return null;
	if (values.includes(value)) return value;

	throw messages.oneof.base.replace(/{{values}}/, values.join(', '));

}