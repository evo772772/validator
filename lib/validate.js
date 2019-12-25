const iterator = (schema, values, cb, keys = []) => {

	for (let key in schema) {

		if (!schema[key]) throw 'Invalid validator';

		if (schema[key].constructor.name === 'Function') {

			let validator = schema[key];

			let error;
			let value;

			try { value = validator(values[key]); }
			catch (e) { error = e; }

			cb(error, key, keys, value);

		} else if (schema[key].constructor.name === 'Object') iterator(schema[key], values[key], cb, keys.concat(key));
		else throw 'Invalid type for validator';

	}

}

module.exports = (schema, data) => {

	let values = {};
	let errors = {};

	iterator(schema, data, (error, key, keys, value) => {

		if (error) return errors[keys.concat(key).join('.')] = error;

		let ref = values;

		keys.forEach(key => {

			if (!ref[key]) ref[key] = {};
			ref = ref[key];

		});

		if (value !== null) ref[key] = value;

	});

	if (Object.keys(errors).length > 0) throw errors;

	return values;

}