const validate = require('./validate');
const bool     = require('./validators/bool');
const number   = require('./validators/number');
const oneOf    = require('./validators/one-of');
const regExp   = require('./validators/regexp');
const string   = require('./validators/string');
const uuid     = require('./validators/uuid');

module.exports = {
	validate,
	bool,
	number,
	oneOf,
	regExp,
	string,
	uuid
}
