import { isSortedValues } from '../src'

describe('isSortedValues', () => {
	test('empty', () => {
		const items: Array<string | number> = []

		expect(isSortedValues(items)).toBeTruthy()
	})
	test('single', () => {
		const items = [1]

		expect(isSortedValues(items)).toBeTruthy()
	})
	test('same', () => {
		const items = [1, 1, 1]

		expect(isSortedValues(items)).toBeTruthy()
	})
	test('string', () => {
		const itemsAsc = ['a', 'b', 'c']
		const itemsDesc = ['c', 'b', 'a']
		const itemsUnsorted = ['a', 'c', 'b']

		expect(isSortedValues(itemsAsc, 'asc')).toBeTruthy()
		expect(isSortedValues(itemsDesc, 'desc')).toBeTruthy()
		expect(isSortedValues(itemsUnsorted)).toBeFalsy()
	})
	test('number', () => {
		const itemsAsc = [1, 2, 3]
		const itemsDesc = [3, 2, 1]
		const itemsUnsorted = [1, 3, 2]

		expect(isSortedValues(itemsAsc, 'asc')).toBeTruthy()
		expect(isSortedValues(itemsDesc, 'desc')).toBeTruthy()
		expect(isSortedValues(itemsUnsorted)).toBeFalsy()
	})
})
