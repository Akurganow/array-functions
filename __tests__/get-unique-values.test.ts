import getUniqueValues from '../src/getUniqueValues'

describe('getUniqueValues', () => {
	test('string', () => {
		const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'a' }]

		const unique = getUniqueValues(items, 'id')

		expect(unique).toEqual(['a', 'b', 'c'])
	})
	test('number', () => {
		const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }]

		const unique = getUniqueValues(items, 'id')

		expect(unique).toEqual([1, 2, 3])
	})
	test('mixed', () => {
		const items = [{ id: 'a' }, { id: 2 }, { id: 'c' }, { id: 1 }]

		const unique = getUniqueValues(items, 'id')

		expect(unique).toEqual(['a', 2, 'c', 1])
	})
	test('empty', () => {
		const items: Array<never> = []

		const unique = getUniqueValues(items, 'id')

		expect(unique).toEqual([])
	})
	test('undefined', () => {
		const items = [{ id: undefined }, { id: undefined }]

		const unique = getUniqueValues(items, 'id')

		expect(unique).toEqual([undefined])
	})
	test('null', () => {
		const items = [{ id: null }, { id: null }]

		const unique = getUniqueValues(items, 'id')

		expect(unique).toEqual([null])
	})
	test('boolean', () => {
		const items = [{ id: true }, { id: false }, { id: true }]
		const unique = getUniqueValues(items, 'id')

		expect(unique).toEqual([true, false])
	})
})
