const dm = require('./../messages');
const co = require('./../check-options');

module.exports = (options = {}) => (value) => {

	let { required, messages } = co(options, 'uuid');

	messages = { ...dm.uuid, required: dm.required, ...(messages || {}) };

	if (required && (typeof value === void 0 || value === null)) throw messages.required;
	if (value === void 0 || value === null) return null;
	if (!/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value)) throw messages.uuid.base;

	return value;

}