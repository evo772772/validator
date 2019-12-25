const pkg = require('./../package.json');

const messages = {

	boolean : (type, key) => `${pkg.name}. ${type}.${key}: type of expression must be Boolean`,
	string  : (type, key) => `${pkg.name}. ${type}.${key}: type of expression must be String`,
	number  : (type, key) => `${pkg.name}. ${type}.${key}: type of expression must be Number`

}

const checkOptions = (options, type) => {

	options = {
		required : true,
		...options
	}

	Object.keys(options).forEach((key) => {

		let value = options[key];

		switch(key) {

			case 'required':
				if (typeof value !== 'boolean') throw messages.boolean(type, key);
				break;

			case 'length':
				if (typeof value !== 'number') throw messages.number(type, key);
				break;

			case 'max':
				if (typeof value !== 'number') throw messages.number(type, key);
				if (value < 1) throw `${pkg.name}. ${type}.${key}: value cannot be less than 1`;
				break;

			case 'min':
				if (typeof value !== 'number') throw messages.number(type, key);
				if (value < 0) throw `${pkg.name}. ${type}.${key}: value cannot be less than 0`;
				break;

			case 'int':
				if (typeof value !== 'boolean') throw messages.boolean(type, key);
				break;

			case 'float':
				if (typeof value !== 'boolean') throw messages.boolean(type, key);;
				break;

			case 're':
				if (value.constructor.name !== 'RegExp') throw `${pkg.name}. ${type}.${key}: type of expression must be RegExp`;
				break;

			case 'values':
				if (!Array.isArray(value)) throw `${pkg.name}. ${type}.${key}: type of expression must be Array`;
				break;

			case 'messages':
				if (value.constructor.name !== 'Objext') throw `${pkg.name}. ${type}.${key}: type of expression must be Object`;
				break;

		}

	});

	return options;

}

module.exports = checkOptions;