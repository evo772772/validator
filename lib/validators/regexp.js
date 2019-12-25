const dm = require('./../messages');
const co = require('./../check-options');

module.exports = (options = {}) => (value) => {

	let { required, re, messages } = co(options, 'regexp');

	messages = { ...dm.regexp, required: dm.required, ...(messages || {}) };

	if (required && (value === void 0 || value === null)) throw messages.required;
	if (value === void 0 || value === null) return null;
	if (!re.test(value)) throw messages.regexp.base.replace(/{{re}}/, re.toString());

	return value;

}