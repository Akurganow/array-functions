import { splitByKeyValue } from '../src'

describe('splitByKeyValue', () => {
	test('splits an array of objects into subarrays with the same value of the given key', () => {
		const array = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Alice' },
		]

		const result = splitByKeyValue(array, 'name')

		expect(result).toEqual([
			[{ id: 1, name: 'Alice' }, { id: 3, name: 'Alice' }],
			[{ id: 2, name: 'Bob' }],
		])
	})
})
