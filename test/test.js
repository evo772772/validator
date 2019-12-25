const assert = require('assert');
const v      = require('./../lib/index');

describe('Check', () => {

	it('Boolean', () => {

		let values = v.validate(
			{ b1: v.bool(), b2: v.bool() },
			{ b1: true, b2: false }
		);

		assert.deepEqual(values, { b1: true, b2: false });

	});

	it('String', () => {

		let values = v.validate(
			{ s1: v.string(), s2: v.string({ min: 2 }), s3: v.string({ max: 5 }) },
			{ s1: 's1', s2: 's2', s3: 's3' }
		);

		assert.deepEqual(values, { s1: 's1', s2: 's2', s3: 's3' });

	});

	it('Number', () => {

		let values = v.validate(
			{
				n1: v.number(),
				n2: v.number({ min: 2 }),
				n3: v.number({ max: 5 }),
				n4: v.number({ between: [2, 5] }),
				n5: v.number({ int: true }),
				n6: v.number({ float: true })

			},
			{ n1: 3, n2: 3, n3: 3, n4: 3, n5: 3, n6: 3.3 }
		);

		assert.deepEqual(values, { n1: 3, n2: 3, n3: 3, n4: 3, n5: 3, n6: 3.3 });

	});

	it('OneOf', () => {

		let values = v.validate(
			{ of: v.oneOf({ values: ['1', '2', '3'] }) },
			{ of: '1' }
		);

		assert.deepEqual(values, { of: '1' });

	});

	it('UUID', () => {

		let values = v.validate(
			{ uuid: v.uuid() },
			{ uuid: '6f7e52b6-aa15-4a52-8dfa-464568c184a5' }
		);

		assert.deepEqual(values, { uuid: '6f7e52b6-aa15-4a52-8dfa-464568c184a5' });

	});

	it('RegExp', () => {

		let values = v.validate(
			{ re: v.regExp({ re: /^re/ }) },
			{ re: 're---' }
		);

		assert.deepEqual(values, { re: 're---' });

	});

});